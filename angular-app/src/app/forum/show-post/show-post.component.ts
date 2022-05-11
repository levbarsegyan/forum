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
  permittedForControls = false;
  wasDeleted = false;
  forumPost: ForumPost;
  postAuthor: string;
  ngOnInit() {
    let postId;
    this.activatedRoute.params.subscribe(params => {
      postId = params.id;
    });
    this.getPost(postId);
    this.userService.checkUser().subscribe(
      user => {
        this.userService.currentUser = user;
      },
      error => {
        console.log(error.message);
        this.userService.currentUser = null;
      }
    );
  }
  upVote() {
    this.forumService.increaseForumVote(this.forumPost._id).subscribe(
      data => {
        console.log('I voted up');
      },
      error => {
        console.log('error voting up');
      }
    );
  }
  downVote() {
    this.forumService.decreaseForumVote(this.forumPost._id).subscribe(
      data => {
        console.log('I voted up');
      },
      error => {
        console.log('error voting up');
      }
    );
  }
  checkVoteStatus() {
    this.forumService.getUserForumVoteStatus(this.forumPost._id).subscribe(
      data => {
        console.log(data);
      },
      error => {
      }
    );
  }
  deletePost(post: ForumPost) {
    this.forumService.deleteForumPost(post._id).subscribe(
      data => {
        if (data.sent) {
          this.wasDeleted = true;
          post.title = 'Deleted';
          post.content = data.message;
        } else {
          this.openSnackBar(data.message, 'Okay');
        }
      },
      error => {
        this.message = error.message;
      }
    );
    setTimeout(() => {
      this.router.navigate(['/forums/']);
    }, 2000);
  }
  getPost(idOfThePost) {
    this.forumService.showForumPost(idOfThePost).subscribe(
      data => {
        this.forumService.interestedPost = data;
        this.forumPost = data;
        console.log('Vote count is ' + this.forumPost.vote_count);
        this.forumPost.date_published = new Date(data.date_published);
        this.userService.getUsernameFromID(this.forumPost.author).subscribe(
          userdata => {
            this.forumPost.authorname = userdata.user.username;
          },
          error => {
            this.openSnackBar('Error getting username', 'Close');
            this.forumPost.authorname = error;
          }
        );
      },
      error => {
        console.log('There was an error getting the post');
        console.log(error);
      }
    );
  }
  showPostControls(): boolean {
    if (this.userService.currentUser && this.forumService.interestedPost) {
      if (  this.userService.currentUser._id === this.forumService.interestedPost.author) {
        return true;
      }
    }
    return false;
  }
  checkSignedOut(): boolean {
    return !this.userService.isUserSignedIn;
  }
  createComment(postId: number, form: NgForm) {
    if (this.userService.currentUser) {
      this.commentButtonClicked = true;
      const commentItem = {
        content: form.value.enteredComment,
        date_published: new Date(),
      };
      this.forumService.addReplyToForumPost(postId, commentItem).subscribe(
        data => {
          this.openSnackBar(data.message, 'Close');
          this.reloadPage();
        },
        error => {
          this.openSnackBar(error.message, 'Close');
        }
      );
    } else {
      this.openSnackBar('You need to log in to post a comment', 'Close');
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  reloadPage() {
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}
