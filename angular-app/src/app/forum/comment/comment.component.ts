import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { MatSnackBar } from '@angular/material';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumComment } from 'src/app/models/comment.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  constructor(
    private forumService: ForumService,
    private snackBar: MatSnackBar,
  ) { }
  forumPost: ForumPost;
  forumComments: ForumComment[] = [];
  editToggle = false;
  commentButtonClicked = false;
  targetCommentId: number = null;
  ngOnInit() {
    this.forumPost = this.forumService.getInterestedPost();
    this.listComments(this.forumPost.comment);
  }
  listComments(comments) {
    comments.forEach(commentId => {
      this.forumService.listAComment(commentId).subscribe(
        commentData => {
          const comment: ForumComment = {
            _id: commentData._id,
            content: commentData.content,
            author: commentData.author,
            date_published: commentData.date_published,
          };
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
        let messageFromTheServer = '';
        messageFromTheServer = data.toString();
        this.openSnackBar(messageFromTheServer, 'Close');
        location.reload();
      },
      error => {
        this.openSnackBar(error.message, 'Close');
      }
    );
  }
  editComment(commentForm: NgForm, oldCommentData: ForumComment) {
    const comment: ForumComment = {
      _id: oldCommentData._id,
      author: oldCommentData.author,
      date_published: oldCommentData.date_published,
      content: commentForm.value.enteredComment,
    };
    this.forumService.editReplyOfForumPost(comment).subscribe(
      replyData => {
        console.log(replyData.message);
      },
      error => {
        console.log(error);
      }
    );
    location.reload();
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
}
