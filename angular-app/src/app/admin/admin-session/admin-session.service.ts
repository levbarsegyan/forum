import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { toPromise } from 'rxjs/add/operator/toPromise';
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
  signIn(user): Observable<any> {
    return this.http.post<any>(this.signInUrl, user, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  signOut() {
    return this.http.get(this.signOutUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
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
  async check() {
    const response = await this.http.get(this.checkUrl).toPromise();
    return response;
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
