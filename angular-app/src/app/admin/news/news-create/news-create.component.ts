import { Component, OnInit } from '@angular/core';
import { News } from '../../../models/news.model';
import { NgForm } from '@angular/forms';
import { NewsService } from 'src/app/news/news.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  newsPost: News;
  constructor(
    private newsService: NewsService,
    private router: Router,
  ) { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.newsPost = {
      title: form.value.enteredTitle,
      content: form.value.enteredContent,
      author: this.getAuthor(),
      date: this.getDate(),
    };
    this.newsService.saveNews(this.newsPost).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAuthor() {
    return 'Admin';
  }
  getDate() {
    return new Date();
  }
}
