import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, throwError, combineLatest } from "rxjs";
import { catchError, shareReplay, concatMap, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Auth, ClientPrincipal } from "./auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthSWAService implements Auth {
  private authClient$ = (from(this.authProvider()) as Observable<ClientPrincipal | null>).pipe(
    shareReplay(1),
    catchError((err) => throwError(err))
  );

  public isAuthenticated$ = this.authClient$.pipe(
    concatMap((user) => from(Promise.resolve(!!user))),
    tap((res) => (this.loggedIn = res))
  );

  private userProfileSubject$ = new BehaviorSubject<ClientPrincipal>(null);
  private handleRedirectCallback$ = this.authClient$.pipe(concatMap((user) => from(Promise.resolve(true))));
  public userProfile$ = this.userProfileSubject$.asObservable();
  public loggedIn: boolean = null;

  constructor(private location: Location) {
    this.handleAuthCallback();
  }
  login(redirect = "/") {
    const url = environment?.swaAuth?.github?.login;
    this.location.go(url);
  }

  logout() {
    const url = environment?.swaAuth?.github?.logout;
    this.location.go(url);
  }

  getUser$(options?) {
    return this.authClient$.pipe(tap((user) => this.userProfileSubject$.next(user)));
  }

  async authProvider(): Promise<ClientPrincipal> {
    const response = await fetch("/.auth/me");
    const payload = (await response.json()) as { clientPrincipal: ClientPrincipal };
    const { clientPrincipal } = payload;
    return {
      ...clientPrincipal,
      nickname: clientPrincipal.userDetails,
    };
  }

  private handleAuthCallback() {
    const authComplete$ = this.handleRedirectCallback$.pipe(
      concatMap(() => {
        return combineLatest([this.getUser$(), this.isAuthenticated$]);
      })
    );

    authComplete$.subscribe(([user, loggedIn]) => {
      this.location.go("/profile");
    });
  }
}
