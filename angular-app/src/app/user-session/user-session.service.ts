import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  user: User = {
    email: '',
    username: '',
    confirmed: '',
    creation_date: '',
  };
  signInUrl = 'http:
  registerUrl = 'http:
  userUrl = 'http:
  userInfoUrl = 'http:
  logoutUrl = 'http:
  allUsersUrl = 'http:
  constructor(private http: HttpClient) { }
  loginRequest(user): Observable<any> {
    return this.http.post<any>(this.signInUrl, user, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  registerRequest(body): Observable<any> {
    return this.http.post(this.registerUrl, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  getUsernameFromID( id): Observable<any> {
    return this.http.post<any>(this.userInfoUrl, { id }, {
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
  logout(): Observable<any> {
    return this.http.get(this.logoutUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
  getAllUsers(): Observable<any> {
    return this.http.get(this.allUsersUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
