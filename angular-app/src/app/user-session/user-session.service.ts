import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _isUserSignedIn: boolean = false;
  private _user: User;
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
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  registerRequest(body): Observable<any> {
    return this.http.post(this.registerUrl, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getUsernameFromID(id): Observable<any> {
    return this.http.post<any>(this.userInfoUrl, { id }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  checkUser(): Observable<any> {
    return this.http.get<any>(this.userUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  logout(): Observable<any> {
    return this.http.get(this.logoutUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getAllUsers(): Observable<any> {
    return this.http.get(this.allUsersUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public get isUserSignedIn(): boolean {
    return this._isUserSignedIn;
  }
  public set isUserSignedIn(value: boolean) {
    this._isUserSignedIn = value;
  }
  public get currentUser(): User {
    return this._user;
  }
  public set currentUser(value: User) {
    this._user = value;
  }
}
