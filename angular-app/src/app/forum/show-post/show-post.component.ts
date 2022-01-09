import { Component, OnInit } from '@angular/core';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  constructor(private forumService: ForumService, private router: Router) { }
  forumPost: ForumPost;
  ngOnInit() {
    if (this.forumService.getInterestedPost()) {
      this.forumService.showForumPost().subscribe(
        data => { this.forumPost = data; },
        error => {
          console.log('There was an error getting the post');
          console.log(error);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }
  submitComment(form: NgForm) {
  }
}
