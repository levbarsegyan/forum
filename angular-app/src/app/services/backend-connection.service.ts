import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BackendConnectionService {
  constructor() { }
  public getFullAddress() {
    return 'http:
  }
  public getAddressWithPort() {
    return this.getAddress() + ':' + this.getPort();
  }
  public getPort(): string {
    return environment.BACKEND_PORT;
  }
  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': this.getFullAddress(),
    });
  }
  public getAddress(): string {
    return environment.BACKEND_DOMAIN;
  }
  public getHttpOptions(): any {
    return {
      headers: this.getHeaders(),
      observe: 'body',
      withCredentials: true,
    };
  }
}
