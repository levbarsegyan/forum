import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }
  signInUrl = 'http:
  signOutUrl = 'http:
  userUrl = 'http:
  registerUrl = 'http:
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
    return this.http.get<any>(this.registerUrl, {
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
}
