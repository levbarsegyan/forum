import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminSessionService } from './admin-session/admin-session.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  private _loggedIn = false;
  constructor(
    private adminSession: AdminSessionService,
    private router: Router,
    private http: HttpClient,
  ) { }
  canActivate(): Observable<boolean> {
    return this.http.get<any>(this.adminSession.checkUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  public get loggedIn(): boolean {
    return this._loggedIn;
  }
  public set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
