import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <pre *ngIf="auth.userProfile$ | async as profile">
      <code>{{ profile | json }}</code>
    </pre>
  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
