import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ApiServiceService } from '../../service/api/api-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  storageToken: any;
  constructor(
    private router: Router,
    private apiService: ApiServiceService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let currentUser = false;
    this.storageToken = this.apiService.getToken();
    if (this.storageToken !== undefined && this.storageToken !== null) {
      currentUser = true;
    }

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
