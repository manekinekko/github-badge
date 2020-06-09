import { Component } from "@angular/core";
import { AuthService } from "./auth0.service";

@Component({
  selector: "app-home",
  template: `
    <app-profile>
      <button (click)="auth.login('/profile')" *ngIf="!auth.loggedIn">Log In</button>
    </app-profile>
  `,
  styles: [
    `
      button {
        position: absolute;
        top: 45%;
        left: 50%;
        width: 200px;
        margin-left: -100px;
        font-size: 1.6em;
        background: transparent;
        border: 2px solid white;
        color: white;
        border-radius: 4px;
        padding: 20px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
