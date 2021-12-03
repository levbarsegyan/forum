import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminSessionService } from './admin-session/admin-session.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private adminSession: AdminSessionService, private router: Router) { }
  private loggedIn: boolean;
  canActivate(): boolean {
    this.adminSession.loginStatus().subscribe(data => {
      this.loggedIn = data;
    });
    if (!this.loggedIn) {
      this.router.navigate(['admin-sign-in']);
    }
    return this.loggedIn;
  }
}
