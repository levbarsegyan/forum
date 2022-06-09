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
  private getNewsPostUrl = 'http:
  private saveNewsUrl = 'http:
  private editNewsUrl = 'http:
  private deleteNewsUrl = 'http:
  private httpOptions: any = {
    observe: 'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  };
  saveNews(news: News): Observable<any> {
    console.log(news);
    return this.http.post<any>(this.saveNewsUrl, { news }, this.httpOptions);
  }
  updateNews(news: News) {
    return this.http.post(this.editNewsUrl, { news }, this.httpOptions);
  }
  deleteNews(newsId: number) {
    const news = { _id: newsId };
    return this.http.post(this.deleteNewsUrl, { news }, this.httpOptions);
  }
  getNewsPost(newsId: number): Observable<any> {
    const news = { _id: newsId };
    return this.http.post<any>(this.getNewsPostUrl, { news }, this.httpOptions);
  }
  getAllNews(): Observable<any> {
    return this.http.get<any>(this.getNewsUrl, this.httpOptions);
  }
}
