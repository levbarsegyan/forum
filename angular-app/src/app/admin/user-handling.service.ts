import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserHandlingService {
  constructor(
    private http: HttpClient,
  ) { }
  private _domain = environment.BACKEND_DOMAIN;
  private _port = environment.BACKEND_PORT;
  listAllUsersUrl = 'http:
  listBannedUsersUrl = 'http:
  banUserUrl = 'http:
  unbanUserUrl = 'http:
  private httpOptions: any = {
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };
  banUser(userId: number): Observable<any> {
    const ban = { _id: userId };
    return this.http.post(this.banUserUrl, { ban }, this.httpOptions);
  }
  unbanUser(userId: number): Observable<any> {
    const unban = { _id: userId };
    return this.http.post(this.unbanUserUrl, { unban }, this.httpOptions);
  }
  getUserList(): Observable<any> {
    return this.http.get(this.listAllUsersUrl, this.httpOptions);
  }
  getBannedUserList(): Observable<any> {
    return this.http.get(this.listBannedUsersUrl, this.httpOptions);
  }
}
