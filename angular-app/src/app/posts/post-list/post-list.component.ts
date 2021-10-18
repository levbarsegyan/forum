import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postService: PostService;
  constructor(public postServ: PostService) {
    this.postService = postServ;
  }
  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }
}
