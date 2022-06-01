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
    const contentInput: string = form.value.enteredContent;
    const contentHtml = contentInput.replace(/\n/g, '<br />');
    this.newsPost = {
      title: form.value.enteredTitle,
      content: contentHtml,
      author: this.getAuthor(),
      date: new Date(),
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
}
