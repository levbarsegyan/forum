import { Injectable } from '@angular/core';
import { ForumPost } from '../models/forum.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private newPostUrl = 'http:
  private deletePostUrl = 'http:
  private listPostUrl = 'http:
  private deletePostReplyUrl = 'http:
  private increaseVoteUrl = 'http:
  private decreaseVoteUrl = 'http:
  private addReplyUrl = 'http:
  private showReplyUrl = 'http:
  private showPostUrl = 'http:
  constructor(private router: Router, private http: HttpClient) { }
  increaseVote() {
    const userToken = { message: 'example text' };
    return this.http.post(this.newPostUrl, userToken, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  decreaseVote() {
    const userToken = { message: 'example text' };
    return this.http.post(this.newPostUrl, userToken, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  addNewForumPost(forumPost: ForumPost): Observable<any> {
    return this.http.post(this.newPostUrl, forumPost, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  deleteForumPost(id: string) {
    return this.http.delete(this.deletePostUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editForumPost(forumPost: ForumPost): Observable<any> {
    return this.http.put(this.newPostUrl, forumPost, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  addReplyToForumPost(postId: string) {
    return this.http.put(this.addReplyUrl, postId, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  removeReplyFromForumPost(forumPost: ForumPost) {
    return this.http.delete(this.deletePostReplyUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editReplyOfForumPost(): Observable<any> {
    return this.http.get(this.showReplyUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  listAllForumPost(): Observable<any> {
    return this.listSomeForumPosts(100);
  }
  listSomeForumPosts(amountToList): Observable<any> {
    return this.http.get(this.listPostUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  showForumPost() {
    const postId = 1;
    return this.http.get(this.showForumPost + '/' + postId, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
