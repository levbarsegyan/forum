import { Component, OnInit } from '@angular/core';
import { News } from './news.model';
import { NewsService } from './news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
