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
    this.adminSessionService.check().subscribe(
      data => {
        this.adminAccess = true;
      },
      error => {
        this.adminAccess = false;
      }
    );
  }
  getNews() {
    const exampleNews: News = {
      title: 'Example title for the frontpage',
      author: 'Admin',
      content: 'Welcome to play deca we hope you enjoy your stay here. We try to keep the community happy friendly and kind. All are welcome and we hope to see you out and about on the server. Good luck and have fun.',
      date: new Date(),
    };
    this.allNews.push(exampleNews);
    this.allNews.push(exampleNews);
    this.allNews.push(exampleNews);
  }
}
