import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { selectAuthState, AppState } from '../../store/state/app-state';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  getState: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser = false;
    const storage = localStorage.getItem('token');
    if (storage) {
      currentUser = true;
    }

    if (currentUser) {
      console.log('here');
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
