import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
import { ForumPost } from 'src/app/models/forum.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  constructor(private forumService: ForumService, private router: Router) { }
  newPost;
  contentHtml = '';
  fullTitle = '';
  successfullyPosted: boolean;
  ngOnInit() {
  }
  submitPost(form: NgForm) {
    const contentInput: string = form.value.enteredContent;
    this.contentHtml = contentInput.replace(/\n/g, '<br />');
    this.fullTitle = form.value.enteredTitle;
    const currentDate = Date();
    this.newPost = {
      author: this.getCurrentUsername(),
      title: this.fullTitle,
      content: this.contentHtml,
      date_published: currentDate.toString(),
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
    this.redirectUserToList();
  }
  sendMessageForSuccessOrFailure(message) {
    console.log(message.message);
  }
  getCurrentUsername(): string {
    return 'Person';
  }
  redirectUserToList() {
    console.log('Waiting');
    setTimeout(() => {
      this.router.navigate(['/forums/list']);
    }, 2000);
  }
}
