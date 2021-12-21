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
  ngOnInit() {
  }
  submitPost(form: NgForm) {
  }
}
