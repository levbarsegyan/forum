import { Injectable } from '@angular/core';
import { UserSessionService } from '../user-session/user-session.service';
import { ForumService } from './forum.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(
    private userService: UserSessionService,
    private forumService: ForumService,
    private router: Router,
    private http: HttpClient,
  ) { }
  private _domain = environment.BACKEND_DOMAIN;
  private _port = environment.BACKEND_PORT;
  private userVoteInfoUrl = 'http:
  private incForumVoteUrl = 'http:
  private decForumVoteUrl = 'http:
  private incCommentVoteUrl = 'http:
  private decCommentVoteUrl = 'http:
  private httpOptions: any = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
    observe: 'body',
    withCredentials: true,
  };
  private getForumVoteStatusFromBackend(forumId: number): Observable<any> {
    const forum = { _id: forumId }; 
    return this.http.post<any>(this.userVoteInfoUrl, { forum }, this.httpOptions);
  }
  increaseForumVote(forumId: number, alreadyVoted: boolean) {
    return this.sendVote(forumId, alreadyVoted, this.incForumVoteUrl);
  }
  decreaseForumVote(forumId: number, alreadyVoted: boolean) {
    return this.sendVote(forumId, alreadyVoted, this.decForumVoteUrl);
  }
  private sendVote(forumId: number, alreadyVoted: boolean, locationUrl: string) {
    const forum = { _id: forumId };
    return this.http.post(locationUrl, { forum, voted: alreadyVoted }, this.httpOptions);
  }
  getUserForumVoteStatus(forumId: number): Vote {
    let currentVoteStatus: Vote;
    currentVoteStatus = {
      forum_id: forumId,
      voted_up: false,
      voted_down: false,
      author_id: 0,
    };
    if (this.userService.currentUser) {
      currentVoteStatus.author_id = this.userService.currentUser._id;
      this.getForumVoteStatusFromBackend(forumId).subscribe(
        data => {
          if (data.vote.voted_up != null) {
            currentVoteStatus.voted_up = data.vote.voted_up;
          }
          if (data.vote.voted_down != null) {
            currentVoteStatus.voted_down = data.vote.voted_down;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    return currentVoteStatus;
  }
}
