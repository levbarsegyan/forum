import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
import { ForumPost } from 'src/app/models/forum.model';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/user-session/user-session.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  constructor(
    private forumService: ForumService,
    private router: Router,
    private userService: UserSessionService,
  ) { }
  newPost;
  contentHtml = '';
  fullTitle = '';
  successfullyPosted: boolean;
  currentUser;
  ngOnInit() {
    this.userService.checkUser().subscribe(user => {
      this.currentUser = user;
    });
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
    return this.currentUser.username;
  }
  redirectUserToList() {
    console.log('Waiting');
    setTimeout(() => {
      this.router.navigate(['/forums']);
    }, 2000);
  }
}
