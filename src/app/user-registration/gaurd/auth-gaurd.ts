import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let currentUser = false;
    const storage = sessionStorage.getItem('token');
    if (storage !== 'undefined' && storage !== null) {
      currentUser = true;
    }

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
