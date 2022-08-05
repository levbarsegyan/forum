import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserHandlingService {
  constructor(
    private http: HttpClient,
  ) { }
  listAllUsersUrl = 'http:
  listBannedUsersUrl = 'http:
  banUserUrl = 'http:
  unbanUserUrl = 'http:
  private httpOptions: any = {
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
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
