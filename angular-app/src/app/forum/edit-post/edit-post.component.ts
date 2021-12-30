import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { ForumPost } from '../../models/forum.model';
import { NgForm } from '@angular/forms';
import { format } from 'util';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  constructor(private forumService: ForumService) { }
  fullTitle = '';
  contentHtml = '';
  forumPost: ForumPost;
  newPost: ForumPost;
  something = 'something something something something';
  message: string;
  ngOnInit() {
    this.forumPost = this.forumService.showForumPost();
    this.contentHtml = this.forumPost.content;
  }
  publishNewInformation(form: NgForm) {
    this.newPost = {
      author: 'Person',
      title: form.value.title,
      content: form.value.content,
      date_published: Date.now().toString(),
    };
    this.forumService.editForumPost(this.newPost).subscribe(
      data => {
        this.message = data.message;
      },
      error => {
        this.message = error.message;
      }
    );
  }
}
