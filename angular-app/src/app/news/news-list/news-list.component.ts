import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.model';
import { NewsService } from '../news.service';
import { AdminSessionService } from 'src/app/admin/admin-session/admin-session.service';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  allNews: News[] = [];
  adminAccess = false;
  constructor(
    private newsService: NewsService,
    private adminSessionService: AdminSessionService,
  ) { }
  ngOnInit() {
    this.getNews();
  }
  getNews() {
    const exampleNews: News = {
      title: 'Example title for the frontpage',
      author: 'Admin',
      content: 'Welcome to play deca we hope you enjoy your stay here. We try to keep the community happy friendly and kind. All are welcome and we hope to see you out and about on the server. Good luck and have fun.',
      date: new Date(Date.now()),
    };
    this.newsService.getAllNews().subscribe(
      data => {
        this.allNews = data;
        for (const news of this.allNews) {
          news.date = new Date(news.date);
        }
        console.log(this.allNews);
      },
      error => {
        console.log("News failed to load");
      }
    );
  }
  checkAdminAccess() {
    let allow = false;
    this.adminSessionService.check().subscribe(
      data => {
        allow = true;
      },
      error => {
        allow = false;
      }
    );
    return allow;
  }
}
