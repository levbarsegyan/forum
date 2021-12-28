import { Component, OnInit } from '@angular/core';
import { ForumService } from "../forum.service";
import { ForumPost } from "../../models/forum.model";
import { NgForm } from "@angular/forms";
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
  message: string;
  ngOnInit() {
    this.forumService.showForumPost().subscribe(
      data => {
        this.forumPost = data;
      },
      error => {
        console.log(error.error);
      }
    );
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
