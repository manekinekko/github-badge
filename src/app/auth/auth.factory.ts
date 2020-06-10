import { AuthSWAService } from "./swa.service";
import { AuthService } from './auth0.service';
import { Router } from '@angular/router';
import { ɵConsole } from '@angular/core';

export function authFactory(router: Router, win: Window) {
  if (localStorage.getItem('auth0')) {
    console.log('Using Auth0 Provider!!!');
    return new AuthService(router, win);
  }
  console.log('Using SWA Auth Provider!!!');
  return new AuthSWAService(win);
}