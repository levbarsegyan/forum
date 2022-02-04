import { Component, OnInit } from '@angular/core';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumComment } from '../../models/comment.model';
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  constructor(private forumService: ForumService, private router: Router, private activatedRoute: ActivatedRoute) { }
  message: string;
  wasDeleted = false;
  forumPost: ForumPost;
  forumComments: ForumComment[] = [];
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getPost(params.id);
    });
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
    this.router.navigate(['/forums/list']);
  }
  createComment(postId: number, form: NgForm) {
    const currentDate = Date();
    const commentItem = {
      content: form.value.enteredComment,
      author: 'Author',
      date_published: currentDate.toString(),
    };
    this.forumService.addReplyToForumPost(postId, commentItem).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    );
  }
  editComment(id) {
    this.forumService.setInterestedPost(id);
  }
  getPost(idOfThePost) {
    this.forumService.showForumPost(idOfThePost).subscribe(
      data => {
        this.forumPost = data;
        this.listComment(this.forumPost.comment);
      },
      error => {
        console.log('There was an error getting the post');
        console.log(error);
      }
    );
  }
  listComment(comments) {
    comments.forEach(commentId => {
      this.forumService.listAllComments(commentId).subscribe(
        data => {
          const comment: ForumComment = {
            _id: data._id,
            content: data.content,
            author: data.author,
            date_published: data.date_published,
          };
          console.log(comment);
          this.forumComments.push(comment);
        },
        error => {
          console.log('Failed to load comments!');
        }
      );
    });
  }
  deleteComment(commentId) {
    this.forumService.removeReplyFromForumPost(this.forumPost._id, commentId).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    );
  }
}
