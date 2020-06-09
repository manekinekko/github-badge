import { Observable } from "rxjs";

export interface Auth {
  userProfile$: Observable<any>;
  loggedIn: boolean;
  isAuthenticated$: Observable<boolean>;
  getUser$(options?): Observable<any>;
  login(redirectPath: string): void;
  logout(): void;
}

export interface ClientPrincipal {
  identityProvider: "facebook" | "aad" | "github" | "google" | "twitter";
  userId: string;
  userDetails: string;
  nickname?: string;
  userRoles: ["anonymous", "authenticated"];
}
