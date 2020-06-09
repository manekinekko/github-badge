import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { BehaviorSubject, combineLatest, from, Observable, of, throwError } from "rxjs";
import { catchError, concatMap, shareReplay, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Auth } from "./auth.interface";

// Code adapted from https://auth0.com/docs/quickstart/spa/angular2/01-login#add-the-authentication-service

@Injectable({
  providedIn: "root",
})
export class AuthService implements Auth {
  private auth0Client$ = (from(
    createAuth0Client({
      ...environment.auth0,
      redirect_uri: `${this.window.location.origin}`,
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError((err) => throwError(err))
  );

  public isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap((res) => (this.loggedIn = res))
  );

  private handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  loggedIn: boolean = null;

  constructor(private router: Router, private window: Window) {
    this.localAuthSetup();
    this.handleAuthCallback();
  }

  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap((user) => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = "/") {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: `${this.window.location.origin}`,
        appState: { target: redirectPath },
      });
    });
  }

  private handleAuthCallback() {
    const params = this.window.location.search;
    if (params.includes("code=") && params.includes("state=")) {
      let targetRoute: string;
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap((cbRes) => {
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : "/";
        }),
        concatMap(() => {
          return combineLatest([this.getUser$(), this.isAuthenticated$]);
        })
      );

      authComplete$.subscribe(([user, loggedIn]) => {
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        ...environment.auth0,
        returnTo: `${this.window.location.origin}`,
      });
    });
  }
}
