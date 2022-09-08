import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { Router } from '@angular/router';
import { ForumPost } from '../../models/forum.model';
import { UserSessionService } from '../../services/user-session.service';
import { Vote } from '../../models/vote.model';
import { VoteService } from '../../services/vote.service';
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
    private voteService: VoteService,
  ) { }
  posts: ForumPost[] = [];
  message: string;
  wasDeleted = false;
  userSignedIn = false;
  ngOnInit() {
    this.userService.checkUser().subscribe(
      data => {
        this.userService.currentUser = data;
      },
      error => {
        this.userService.currentUser = null;
        console.log(error);
      }
    );
    this.forumService.listAllForumPost().subscribe(
      data => {
        this.posts = data;
        this.posts.forEach((post) => {
          post.date_published = new Date(post.date_published);
          post.vote_status = {
            forum_id: post._id,
            voted_up: false,
            voted_down: false,
            author_id: 0,
          };
          post.vote_status = this.checkVoteStatus(post._id);
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
  upVote(post, alreadyVotedUp: boolean, alreadyVotedDown: boolean) {
    this.voteService.increaseForumVote(post._id, alreadyVotedUp).subscribe(
      data => {
        console.log('I voted up');
      },
      error => {
        console.log('error voting');
      }
    );
    post.vote_status.voted_up = !alreadyVotedUp;
    (alreadyVotedUp) ? post.vote_count -= 1 : post.vote_count += 1;
    if (alreadyVotedDown) {
      post.vote_count += 1;
      post.vote_status.voted_down = false;
    }
  }
  downVote(post, alreadyVotedUp: boolean, alreadyVotedDown: boolean) {
    this.voteService.decreaseForumVote(post._id, alreadyVotedDown).subscribe(
      data => {
        console.log('I voted down');
      },
      error => {
        console.log('error voting');
      }
    );
    post.vote_status.voted_down = !alreadyVotedDown;
    (alreadyVotedDown) ? post.vote_count += 1 : post.vote_count -= 1;
    if (alreadyVotedUp) {
      post.vote_count -= 1;
      post.vote_status.voted_up = false;
    }
  }
  checkVoteStatus(postId): Vote {
    return this.voteService.getUserForumVoteStatus(postId);
  }
}
