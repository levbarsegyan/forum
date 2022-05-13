import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { Router } from '@angular/router';
import { ForumPost } from 'src/app/models/forum.model';
import { UserSessionService } from 'src/app/user-session/user-session.service';
@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  constructor(
    private forumService: ForumService,
    private router: Router,
    private userService: UserSessionService,
  ) { }
  posts: ForumPost[] = [];
  message: string;
  wasDeleted = false;
  userSignedIn = false;
  ngOnInit() {
    this.forumService.listAllForumPost().subscribe(
      data => {
        this.posts = data;
        this.posts.forEach((post) => {
          post.date_published = new Date(post.date_published);
          this.userService.getUsernameFromID(post.author).subscribe(
            userdata => {
              post.authorname = userdata.user.username;
            },
            error => {
              console.log('Error getting username: ' + error);
            }
          );
        });
      },
      error => {
        console.log(error);
      }
    );
    this.userService.checkUser().subscribe(
      data => {
        this.userSignedIn = true;
      },
      error => {
        this.userSignedIn = false;
      }
    );
  }
  upVote(postId) {
    this.forumService.increaseForumVote(postId).subscribe(
      data => {
        console.log('I voted up');
      },
      error => {
        console.log('error voting');
      }
    );
  }
  downVote(postId) {
    this.forumService.decreaseForumVote(postId).subscribe(
      data => {
        console.log('I voted down');
      },
      error => {
        console.log('error voting');
      }
    );
  }
  checkVoteStatus(postId) {
    this.forumService.getUserForumVoteStatus(postId).subscribe(
      data => {
        console.log(data);
      },
      error => {
      }
    );
  }
}
