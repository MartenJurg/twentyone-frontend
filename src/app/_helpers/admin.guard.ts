import {AuthService} from "../_services/auth.service";

﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenStorageService} from "../auth/token-storage.service";



@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (this.tokenStorage.getLoggedIn() && this.tokenStorage.getAuthority() == "ROLE_ADMIN") {
      // authorised so return true
      console.log("JES");
      return true;
    }
    console.log("feil");


    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }



}
