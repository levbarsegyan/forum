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
  promoteUserUrl = 'http:
  private httpOptions: any = {
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  };
  banUser(userId: number): Observable<any> {
    const user = { _id: userId };
    return this.http.post(this.banUserUrl, user, this.httpOptions);
  }
  unbanUser(userId: number): Observable<any> {
    const user = { _id: userId };
    return this.http.post(this.banUserUrl, user, this.httpOptions);
  }
  getUserList(): Observable<any> {
    return this.http.post(this.banUserUrl, this.httpOptions);
  }
  getBannedUserList(): Observable<any> {
    return this.http.get<any>(this.banUserUrl, this.httpOptions);
  }
  promoteUser(userId: number, promotion: string) {
  }
}
