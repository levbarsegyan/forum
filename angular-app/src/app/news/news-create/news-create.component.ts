import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';
import { NgForm } from '@angular/forms';
import { NewsComponent } from '../news.component';
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
    this.newsPost = {
      title: form.value.enteredTitle,
      content: form.value.enteredContent,
      author: 'Author Name in News-Create',
      date: new Date(),
    };
    this.newsService.saveNews(this.newsPost);
  }
  getAuthorOfNews() {
  }
}
