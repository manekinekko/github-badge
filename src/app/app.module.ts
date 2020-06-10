import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Router } from "@angular/router";
import { Animate3dDirective } from "./animate-3d.directive";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth/auth0.guard";
import { AuthService } from "./auth/auth0.service";
import { HomeComponent } from "./home.component";
import { ProfileComponent } from "./profile.component";
import { authFactory } from "./auth/auth.factory";

@NgModule({
  declarations: [AppComponent, ProfileComponent, HomeComponent, Animate3dDirective],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: "**", pathMatch: "full", redirectTo: "/" },
    ]),
  ],
  providers: [
    { provide: Window, useValue: window },
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [Router, Window]
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
