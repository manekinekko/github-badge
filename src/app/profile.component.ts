import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AuthService } from "./auth/auth0.service";
import { GithubService } from "./auth/github.service";

@Component({
  selector: "app-profile",
  template: `
    <div class="container" animate3d *ngIf="userProfile$ | async as profile">
      <div class="card-profile">
        <div class="card-profile-image" [style.background-image]="'url(' + profile?.avatar_url + ')'"></div>
        <div class="card-profile-info" *ngIf="profile?.name; else loginTemplate">
          <h2 class="infos_name">{{ profile?.name }}</h2>
          <p class="infos_nick">
            <a [href]="profile?.html_url">@{{ profile?.login }}</a>
          </p>
        </div>

        <ng-template #loginTemplate>
          <ng-content> </ng-content>
        </ng-template>
      </div>
      <ul>
        <li>
          <span>Followers</span><b>{{ profile?.followers }}</b>
        </li>
        <li>
          <span>Repos</span><b>{{ profile?.public_repos }}</b>
        </li>
        <li>
          <span>Gists</span><b>{{ profile?.public_gists }}</b>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        perspective: 25px;
      }

      h2 {
        margin: 0;
      }

      .container {
        transition: transform 0.2s;
        display: block;
        width: 400px;
        height: 515px;
        border: 1px solid lightgray;
        border-radius: 10px;
        box-shadow: 1px 3px 50px -20px grey;
        position: relative;
        overflow: hidden;
      }

      .card-profile {
        position: relative;
        background: linear-gradient(to bottom, #3b3c3f, #263d85, #172551);
      }

      .card-profile-image {
        transition: background-size 0.2s;
        background-position: center;
        background-size: 420px;
        height: 400px;
        position: relative;
        opacity: 0.5;
        mix-blend-mode: lighten;
        filter: grayscale(100%);
        background-repeat: no-repeat;
      }
      .container.hover .card-profile-image {
        background-size: 430px;
      }

      .card-profile-info {
        margin: 0;
        width: 100%;
        font-weight: 600;
        color: #e3f1f5;
        position: absolute;
        display: flex;
        align-items: center;
        flex-direction: column;
        bottom: 0;
        line-height: 10px;
      }

      .card-profile-info a {
        color: #e3f1f5;
      }

      ul {
        position: absolute;
        width: 100%;
        top: calc(70% + 4em);
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      li {
        flex: 1;
        text-align: center;
      }

      li span {
        display: block;
        float: left;
        clear: both;
        width: 100%;
        color: #b3b1b2;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.2px;
      }

      li b {
        font-size: 26px;
        color: #5e5e5e;
        padding: 0.18em 0;
        display: inline-block;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<any>;

  constructor(public auth: AuthService, private github: GithubService) {
    this.userProfile$ = this.auth.userProfile$.pipe(
      mergeMap((userProfile) => this.github.getGithubUserInfo(userProfile?.nickname))
    );
  }

  async ngOnInit() {}
}
