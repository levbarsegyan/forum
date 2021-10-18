import { Injectable } from '@angular/core';
import { Post } from './post.model';
@Injectable({providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  getPosts() {
    return this.posts;
  }
  addPost(title: string, description: string) {
    const post: Post = { title, content: description };
    this.posts.push(post);
  }
}
