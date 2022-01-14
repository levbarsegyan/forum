import { Component, OnInit } from '@angular/core';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumComment } from '../../models/comment.model';
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  constructor(private forumService: ForumService, private router: Router) { }
  message: string;
  wasDeleted = false;
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
  deletePost(id: number, post: ForumPost) {
    this.forumService.deleteForumPost(id).subscribe(
      data => {
        this.wasDeleted = true;
        post.title = 'Deleted';
        post.content = data.message;
      },
      error => {
        this.message = error.message;
      }
    );
    this.router.navigate(['/forums/list']);
  }
  makePostInterested(id: number) {
    this.forumService.setInterestedPost(id);
  }
  createComment(postId: number, form: NgForm ) {
    const currentDate = Date();
    const commentItem = {
      comment: form.value.enteredComment,
      author: 'Author',
      date_published: currentDate.toString(),
    };
    this.forumService.addReplyToForumPost(postId, commentItem).subscribe(
      data => {
      },
      error => {
      }
    );
  }
  listComment() {
  }
  editComment() {
  }
}
