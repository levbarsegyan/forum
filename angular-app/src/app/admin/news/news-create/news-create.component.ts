import { Component, OnInit } from '@angular/core';
import { News } from '../../../models/news.model';
import { NgForm } from '@angular/forms';
import { NewsService } from '../news.service';
@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  newsPost: News;
  constructor(private newsService: NewsService) { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const currentDate: Date = new Date();
    this.newsPost = {
      title: form.value.enteredTitle,
      content: form.value.enteredContent,
      author: this.getAuthor(),
      date: this.getDate(),
    };
    this.newsService.saveNews(this.newsPost);
  }
  getAuthor() {
    return 'Admin';
  }
  getDate() {
    return new Date();
  }
}
