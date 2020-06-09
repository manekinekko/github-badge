import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-profile",
  template: `
    <div class="container" animate3d>
      <div class="card-profile" *ngIf="userProfile$ | async as profile">
        <div class="card-profile-image" [style.background-image]="'url(' + profile.picture + ')'"></div>
        <div class="card-profile-info">
          <h2 class="infos_name">{{ profile.name }}</h2>
          <p class="infos_nick">@{{ profile.nickname }}</p>
        </div>
      </div>
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
        background-position: top;
        background-size: cover;
        height: 400px;
        position: relative;
        opacity: 0.5;
        mix-blend-mode: lighten;
        filter: grayscale(100%);
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
    `,
  ],
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<any>;


  constructor(public auth: AuthService) {
    this.userProfile$ = auth.userProfile$;
  }

  ngOnInit(): void {
    
  }

  
}
