import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/forum/forum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/user-session/user-session.service';
import { NgForm } from '@angular/forms';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/news/news.service';
@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.css']
})
export class NewsUpdateComponent implements OnInit {
  constructor(
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  fullTitle = '';
  contentHtml = '';
  newsPost: News;
  newPost;
  message: string;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.newsService.getNewsPost(params.id).subscribe(
        postData => {
          this.newsPost = postData;
          console.log(postData);
          this.contentHtml = this.newsPost.content.replace(/<br \/>/gi, '\n');
        },
        error => {
          console.log('There was an error getting the post');
          console.log(error);
        }
      );
    });
  }
  updateNewsPost(form: NgForm) {
    const contentInput: string = form.value.enteredContent;
    const inputAsHtml: string = contentInput.replace(/\n/g, '<br />');
    this.newPost = {
      _id: this.newsPost._id,
      content: inputAsHtml,
    };
    this.newsService.updateNews(this.newPost).subscribe(
      data => {
        this.message = data.message;
        this.router.navigate(['/']);
      },
      error => {
        this.message = error.message;
      }
    );
    console.log('Message from the edit server request ' + this.message);
  }
}
