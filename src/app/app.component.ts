import { Component } from "@angular/core";
import { AuthService } from "./auth0.service";

@Component({
  selector: "app-root",
  template: `
    <header>
      <a routerLink="/">
        <img src="assets/angular-logo.svg" width="28px" />
        <span>GITHU</span><span>BADGE</span>
      </a>
      <span></span>
      <button (click)="auth.logout()" *ngIf="auth.loggedIn">Log Out</button>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
      }
      
      header {
        background-color: black;
        color: white;
        display: flex;
        padding: 10px;
      }
      
      header span {
        flex: 1;
      }

      header a {
        color: white;
        display: flex;
        align-items: center;
        text-decoration: none;
      }

      header span:last-child {
        color: lightcoral;
      }

      button {
        border: 1px solid white;
        background: transparent;
        color: white;
        padding: 0 15px;
      }
    `,
  ],
})
export class AppComponent {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
