import { Component, HostListener, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "./auth/auth0.service";

@Component({
  selector: "app-home",
  template: `
    <app-profile>
      <button #btn class="btn" (click)="login()" *ngIf="!auth.loggedIn">LOG IN</button>
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

      .btn.auth0 {
        border-color: lightcoral;
      }
    `,
  ],
})
export class HomeComponent {
  @ViewChild("btn", {}) btn: ElementRef<HTMLButtonElement>;

  constructor(public auth: AuthService, private window: Window) {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.window.location.href = "/profile";
      }
    });
  }

  @HostListener("window:keydown", ["$event"])
  checkButtonStyle(event) {
    if (event.shiftKey) {
      let useAuth0 = localStorage.getItem("auth0");
      if (useAuth0) {
        localStorage.removeItem("auth0");
      } else {
        localStorage.setItem("auth0", "true");
      }
      this.updateButtonStyle(!!useAuth0);
    }
  }

  updateButtonStyle(useAuth0: boolean) {
    if (useAuth0) {
      this.btn.nativeElement.classList.add("auth0");
    } else {
      this.btn.nativeElement.classList.remove("auth0");
    }
  }

  ngAfterViewInit() {
    let useAuth0 = localStorage.getItem("auth0");
    this.updateButtonStyle(!!useAuth0);
  }

  login() {
    this.auth.login("/profile");
  }
}
