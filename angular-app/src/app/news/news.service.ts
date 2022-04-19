import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(
    private http: HttpClient,
  ) { }
  getNewsUrl = ''
  saveNews(news: News) {
  }
  getAllNews(): Observable<any> {
    return this.http.get(this.getNewsUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
