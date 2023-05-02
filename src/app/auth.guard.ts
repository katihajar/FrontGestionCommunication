
import { Userauth } from './controller/model/userauth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = route.data['role'] as string;
    const authString = localStorage.getItem('auth');
    let us: Userauth | null = null;
    let userRole: string | null = null;

    if (authString) {
      us = JSON.parse(authString) as Userauth;
      userRole = us.user.roles[0].name;
    }

    const token = localStorage.getItem('accessToken');
    if (us != null && userRole === role && token !== "") {
      return true;
    } else {
      this.router.navigate(['/forbidden']).then(() => {
            window.location.reload();
          });
      return false;
    }
  }
}
