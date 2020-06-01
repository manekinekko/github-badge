import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <button (click)="auth.login()" *ngIf="!auth.loggedIn">Log In</button>
      <button (click)="auth.logout()" *ngIf="auth.loggedIn">Log Out</button>
      <a routerLink="/">Home</a>&nbsp;
      <a routerLink="profile" *ngIf="auth.loggedIn">Profile</a>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(public auth: AuthService) {

  }
}
