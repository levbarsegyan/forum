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
  registerUrl = 'http:
  roleUrl = 'http:
  checkUrl = 'http:
  private _loggedIn: boolean;
  public get loggedIn() {
    return this._loggedIn;
  }
  public set loggedIn(value) {
    this._loggedIn = value;
  }
  private httpOptions: any = {
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  };
  register(): Observable<any> {
    return this.http.post<any>(this.registerUrl, this.httpOptions);
  }
  role(): Observable<any> {
    return this.http.get<any>(this.roleUrl, this.httpOptions);
  }
  check(): Observable<any> {
    return this.http.get<any>(this.checkUrl, this.httpOptions);
  }
  checkUser(): Observable<any> {
    return this.http.get<any>(this.userUrl);
  }
}
