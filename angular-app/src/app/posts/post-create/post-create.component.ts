import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { format } from 'url';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  title = "";
  description = "";
  constructor(public postService: PostService) { }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.title = form.value.enteredTitle;
    this.description = form.value.enteredDescription;
    this.postService.addPost(this.title, this.description);
  }
}
