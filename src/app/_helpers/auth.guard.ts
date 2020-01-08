import {AuthService} from "../_services/auth.service";

﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenStorageService} from "../auth/token-storage.service";



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (this.tokenStorage.getLoggedIn()) {
      // authorised so return true
      console.log("WE ARE GOOD TO GO!");
      return true;
    }

    // not logged in so redirect to login page with the return url
    console.log("FAILED!");
    this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    return false;
  }


}
