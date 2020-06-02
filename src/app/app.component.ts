import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <a routerLink="/">
        <img src="assets/angular-logo.svg" width="28px"/>
      </a>
      <span></span>
      <button (click)="auth.login()" *ngIf="!auth.loggedIn">Log In</button>
      <button (click)="auth.logout()" *ngIf="auth.loggedIn">Log Out</button>
    </header>
    <app-profile [user]="auth.userProfile$" *ngIf="auth.loggedIn" ></app-profile>
    <router-outlet></router-outlet>
  `,
  styles: [`
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
    }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {

  }
}
