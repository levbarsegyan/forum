import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  signInUrl = 'http:
  registerUrl = 'http:
  user = {};
  constructor(private http: HttpClient) { }
  sendRequest(email: string, password: string): Observable<User> {
    this.user = {
      email,
      password
    };
    return this.http.post<User>(this.signInUrl, this.user, httpOptions);
  }
  registerRequest(username: string, email: string, password: string) {
  }
}
