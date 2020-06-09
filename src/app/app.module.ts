import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProfileComponent } from "./profile.component";
import { HomeComponent } from "./home.component";

import { RouterModule } from "@angular/router";
import { Animate3dDirective } from "./animate-3d.directive";

import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [AppComponent, ProfileComponent, Animate3dDirective],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', pathMatch: 'full', redirectTo: '/' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
