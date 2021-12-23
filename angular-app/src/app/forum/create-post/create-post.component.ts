import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  constructor(private forumService: ForumService) { }
  text = '';
  fulltitle = '';
  ngOnInit() {
  }
  submitPost(form: NgForm) {
    const input: string = form.value.enteredContent;
    const replaceNewLineWithBR: RegExp = /\n/g;
    this.text = input.replace(replaceNewLineWithBR, '<br />');
    this.fulltitle = form.value.enteredTitle;
  }
}
