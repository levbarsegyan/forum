import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { Router } from '@angular/router';
import { ForumPost } from 'src/app/models/forum.model';
@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  constructor(private forumService: ForumService, private router: Router) { }
  posts: ForumPost[];
  message: string;
  wasDeleted = false;
  ngOnInit() {
    this.forumService.listAllForumPost().subscribe(
      data => {
        this.posts = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  makePostInterested(id: number) {
    this.forumService.setInterestedPost(id);
  }
}
