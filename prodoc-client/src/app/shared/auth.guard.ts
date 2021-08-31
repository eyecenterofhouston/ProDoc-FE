import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivateChild(
    route: ActivatedRouteSnapshot
  ): Promise<boolean> {
    //const currentUser = await this.authService.getUser();
    const currentUser=JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      if (route.data && route.data.roles) {
        if (route.data.roles.includes(currentUser.role)) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    //const currentUser = await this.authService.getUser();
    const currentUser=JSON.parse(localStorage.getItem("user"));
   var user = JSON.parse(localStorage.getItem(user));
    if (currentUser) {
      if (route.data && route.data.roles) {
        if (route.data.roles.includes(currentUser.role)) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
