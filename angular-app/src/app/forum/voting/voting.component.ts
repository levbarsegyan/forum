import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session/user-session.service';
import { ForumService } from '../forum.service';
@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  constructor(
    private userService: UserSessionService,
    private forumService: ForumService,
  ) { }
  ngOnInit() {
  }
  upVote() {
  }
  downVote() {
  }
  checkVoteStatus() {
  }
}
