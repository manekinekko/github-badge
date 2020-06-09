import { Component } from "@angular/core";
import { AuthService } from "./auth/auth0.service";

@Component({
  selector: "app-home",
  template: `
    <app-profile>
      <button class="btn" (click)="login()" *ngIf="!auth.loggedIn">LOG IN</button>
    </app-profile>
  `,
  styles: [
    `
      .btn {
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
        text-align: center;
        text-decoration: none;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(public auth: AuthService) {}

  ngOnInit() {}

  login() {
    this.auth.login("/profile");
  }
}
