import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
import { ForumPost } from 'src/app/models/forum.model';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  constructor(private forumService: ForumService) { }
  newPost: ForumPost;
  contentHtml = '';
  fullTitle = '';
  successfullyPosted: boolean;
  ngOnInit() {
  }
  submitPost(form: NgForm) {
    const ContentInput: string = form.value.enteredContent;
    const replaceNewLineWithBR: RegExp = /\n/g;
    this.contentHtml = ContentInput.replace(replaceNewLineWithBR, '<br />');
    this.fullTitle = form.value.enteredTitle;
    this.newPost = {
      author: 'Person',
      title: this.fullTitle,
      content: this.contentHtml,
      date_published: Date.now(),
    };
    this.forumService.addNewForumPost(this.newPost).subscribe(
      data => {
        this.successfullyPosted = true;
        this.sendMessageForSuccessOrFailure(data);
      },
      error => {
        this.successfullyPosted = false;
        this.sendMessageForSuccessOrFailure(error);
      }
    );
  }
  sendMessageForSuccessOrFailure(message) {
  }
}
