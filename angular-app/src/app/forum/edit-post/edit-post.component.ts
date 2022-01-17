import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { ForumPost } from '../../models/forum.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  constructor(private forumService: ForumService, private router: Router) { }
  fullTitle = '';
  contentHtml = '';
  forumPost: ForumPost;
  newPost;
  message: string;
  ngOnInit() {
    this.forumService.showForumPost().subscribe(
      data => {
        this.forumPost = data;
        this.contentHtml = this.forumPost.content.replace(/<br \/>/gi, '\n');
      },
      error => {
        console.log('There was an error getting the post');
        console.log(error);
      }
    );
  }
  publishNewInformation(form: NgForm) {
    const contentInput: string = form.value.enteredContent;
    const inputAsHtml: string = contentInput.replace(/\n/g, '<br />');
    this.newPost = {
      _id: this.forumPost._id,
      content: inputAsHtml,
    };
    this.forumService.editForumPost(this.newPost).subscribe(
      data => {
        this.message = data.message;
        this.router.navigate(['/forums/list']);
      },
      error => {
        this.message = error.message;
      }
    );
    console.log('Message from the edit server request ' + this.message);
  }
}
