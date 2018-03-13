import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  public redirectUrl: string;

  constructor (private authService: AuthenticationService,
               private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/authentication']);

      return false;
    }
  }
}
