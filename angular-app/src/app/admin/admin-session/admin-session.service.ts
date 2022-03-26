import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminSessionService {
  constructor(private http: HttpClient) { }
  signInUrl = 'http:
  signOutUrl = 'http:
  userUrl = 'http:
  loggedInUrl = 'http:
  registerUrl = 'http:
  roleUrl = 'http:
  checkUrl = 'http:
  private loggedIn: boolean;
  register(): Observable<any> {
    return this.http.post<any>(this.registerUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  role(): Observable<any> {
    return this.http.get<any>(this.roleUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  check(): Observable<any> {
    return this.http.get<any>(this.checkUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  checkUser(): Observable<any> {
    return this.http.get<any>(this.userUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  loginStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.loggedInUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
}
