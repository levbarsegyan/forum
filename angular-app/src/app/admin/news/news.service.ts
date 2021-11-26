import { Injectable } from '@angular/core';
import { News } from '../../models/news.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor() { }
  saveNews(news: News) {
  }
}
