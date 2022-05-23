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
  private getNewsUrl = 'http:
  private saveNewsUrl = 'http:
  private editNewsUrl = 'http:
  private deleteNewsUrl = 'http:
  private httpOptions: any = {
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  };
  saveNews(news: News) {
    console.log(news);
    return this.http.post(this.saveNewsUrl, { news }, this.httpOptions);
  }
  updateNews(news: News) {
    return this.http.post(this.editNewsUrl, { news }, this.httpOptions);
  }
  deleteNews(newsId: number) {
    return this.http.post(this.editNewsUrl, { _id: newsId }, this.httpOptions);
  }
  getAllNews(): Observable<any> {
    return this.http.get<any>(this.getNewsUrl, this.httpOptions);
  }
}
