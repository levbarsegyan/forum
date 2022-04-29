import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { MatSnackBar } from '@angular/material';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumComment } from 'src/app/models/comment.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserSessionService } from 'src/app/user-session/user-session.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  constructor(
    private forumService: ForumService,
    private snackBar: MatSnackBar,
    private userService: UserSessionService,
  ) { }
  forumPost: ForumPost;
  forumComments: ForumComment[] = [];
  editToggle = false;
  commentButtonClicked = false;
  targetCommentId: number = null;
  currentUser;
  ngOnInit() {
    this.forumPost = this.forumService.getInterestedPost();
    this.listComments(this.forumPost.comment);
    this.userService.checkUser().subscribe(user => {
      this.currentUser = user;
    });
  }
  listComments(comments) {
    comments.forEach(commentId => {
      this.forumService.listAComment(commentId).subscribe(
        commentData => {
          const comment: ForumComment = {
            _id: commentData._id,
            content: commentData.content,
            author: commentData.author,
            date_published: new Date(commentData.date_published),
          };
          this.userService.getUsernameFromID(commentData.author).subscribe(
            userdata => {
              comment.authorname = userdata.user.username;
            },
            error => {
              console.log('Error getting username: ' + error);
            }
          );
          this.forumComments.push(comment);
        },
        error => {
          console.log('Failed to load comments!');
          this.openSnackBar('Failed to load comments!', 'Okay');
        }
      );
    });
  }
  deleteComment(commentId) {
    this.forumService.removeReplyFromForumPost(this.forumPost._id, commentId).subscribe(
      data => {
        const messageFromTheServer = data.message;
        this.openSnackBar(messageFromTheServer, 'Close');
        let reload = false;
        reload = data.sent;
        if (reload) {
          this.reloadPage(2000);
        }
      },
      error => {
        this.openSnackBar(error.message, 'Close');
      }
    );
  }
  editComment(commentForm: NgForm, oldCommentData: ForumComment) {
    if (this.currentUser) {
      const comment: ForumComment = {
        _id: oldCommentData._id,
        date_published: oldCommentData.date_published,
        content: commentForm.value.enteredComment,
      };
      this.forumService.editReplyOfForumPost(comment).subscribe(
        replyData => {
          console.log(replyData.message);
          this.openSnackBar(replyData.message, 'Okay');
          this.reloadPage(2000);
        },
        error => {
          this.openSnackBar(error.message, 'Okay');
          console.log(error.message);
        }
      );
    } else {
      this.openSnackBar('You must sign in to edit a reply', 'Close');
    }
  }
  toggleEdit(idThatToggled) {
    this.editToggle = !this.editToggle;
    this.targetCommentId = idThatToggled;
  }
  isEditable(commentId: number) {
    return this.editToggle && commentId === this.targetCommentId;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  reloadPage(time: number) {
    setTimeout(() => {
      location.reload();
    }, time);
  }
}
