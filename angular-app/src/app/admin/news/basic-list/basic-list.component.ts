import { Component, OnInit } from '@angular/core';
import { AdminSessionService } from '../../admin-session/admin-session.service';
import { NewsService } from 'src/app/news/news.service';
import { News } from 'src/app/models/news.model';
@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.css']
})
export class BasicListComponent implements OnInit {
  constructor(
    private adminService: AdminSessionService,
    private newsService: NewsService,
  ) { }
  newsPosts: News[];
  ngOnInit() {
  }
  getNewsList() {
    let listOfAllNewsPosts: News[];
    this.newsService.getAllNews().subscribe(
      data => {
        listOfAllNewsPosts = data;
      },
      error => {
        console.log("Failed to access all the news posts");
      }
    );
    return listOfAllNewsPosts;
  }
}
