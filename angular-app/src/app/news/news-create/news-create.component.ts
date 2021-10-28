import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  newsPost: News;
  constructor() { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
  }
}
