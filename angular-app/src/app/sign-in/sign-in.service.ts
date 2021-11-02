import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  signInUrl = 'http:
  registerUrl = 'http:
  constructor(private http: HttpClient) { }
  loginRequest(user): Observable<any> {
    return this.http.post<any>(this.signInUrl, user, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append(
        'Content-Type', 'application/json'
      )
    });
  }
  registerRequest(body): Observable<any> {
    return this.http.post<any>(this.registerUrl, body, {
      observe: 'body',
      headers: new HttpHeaders().append(
        'Content-Type', 'application/json'
      )
    });
  }
}
