import { Component, OnInit } from '@angular/core';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumComment } from '../../models/comment.model';
import { UserSessionService } from 'src/app/user-session/user-session.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  constructor(
    private forumService: ForumService,
    private userService: UserSessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }
  commentButtonClicked = false;
  message: string;
  wasDeleted = false;
  forumPost: ForumPost;
  postAuthor: string;
  currentUser;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getPost(params.id);
    });
    this.userService.checkUser().subscribe(
      user => {
        this.currentUser = user;
      },
      error => {
        console.log(error.message);
      }
    );
  }
  deletePost(post: ForumPost) {
    this.forumService.deleteForumPost(post._id).subscribe(
      data => {
        this.wasDeleted = true;
        post.title = 'Deleted';
        post.content = data.message;
      },
      error => {
        this.message = error.message;
      }
    );
    this.router.navigate(['/forums/']);
  }
  createComment(postId: number, form: NgForm) {
    this.commentButtonClicked = true;
    const currentDate = Date();
    const commentItem = {
      content: form.value.enteredComment,
      author: this.currentUser._id,
      date_published: currentDate.toString(),
    };
    this.forumService.addReplyToForumPost(postId, commentItem).subscribe(
      data => {
        this.openSnackBar(data.message, 'Close');
        location.reload();
      },
      error => {
        this.openSnackBar(error.message, 'Close');
      }
    );
  }
  getPost(idOfThePost) {
    this.forumService.showForumPost(idOfThePost).subscribe(
      data => {
        this.forumService.setInterestedPost(data);
        this.forumPost = this.forumService.getInterestedPost();
        this.userService.getUsernameFromID( this.forumPost.author ).subscribe(
          userdata => {
            this.postAuthor = userdata.username;
          },
          error => {
            console.log('Error getting username: ' + error);
          }
        );
      },
      error => {
        console.log('There was an error getting the post');
        console.log(error);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
