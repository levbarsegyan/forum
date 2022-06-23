import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _isUserSignedIn = false;
  private _user: User;
  private httpOptions: any = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
    observe: 'body',
    withCredentials: true,
  };
  signInUrl = 'http:
  registerUrl = 'http:
  userUrl = 'http:
  userInfoUrl = 'http:
  logoutUrl = 'http:
  allUsersUrl = 'http:
  confirmEmailUrl = 'http:
  resetPasswordUrl = 'http:
  constructor(private http: HttpClient) { }
  loginRequest(user): Observable<any> {
    return this.http.post<any>(this.signInUrl, user, this.httpOptions);
  }
  registerRequest(body): Observable<any> {
    return this.http.post(this.registerUrl, body, this.httpOptions);
  }
  getUsernameFromID(id): Observable<any> {
    return this.http.post<any>(this.userInfoUrl, { id }, this.httpOptions);
  }
  checkUser(): Observable<any> {
    return this.http.get<any>(this.userUrl, this.httpOptions);
  }
  logout(): Observable<any> {
    return this.http.get(this.logoutUrl, this.httpOptions);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(this.allUsersUrl, this.httpOptions);
  }
  confirmUser(id: number, information: number) {
    const confirmation = { id, information };
    return this.http.post(this.confirmEmailUrl, { confirmation }, this.httpOptions);
  }
  resetPassword(id: number, information: number, password: string) {
    const payload = { id, information, password };
    return this.http.post(this.resetPasswordUrl, { payload }, this.httpOptions);
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
