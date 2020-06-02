import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProfileComponent } from "./profile.component";
import { RouterModule } from "@angular/router";
import { Animate3dDirective } from './animate-3d.directive';

@NgModule({
  declarations: [AppComponent, ProfileComponent, Animate3dDirective],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "profile",
        component: ProfileComponent,
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
