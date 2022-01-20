import { Injectable } from '@angular/core';
import { ForumPost } from '../models/forum.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private currentInterestedPost: number;
  private newPostUrl = 'http:
  private editPostUrl = 'http:
  private deletePostUrl = 'http:
  private listPostUrl = 'http:
  private listCommentsUrl = 'http:
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
  deleteForumPost(id: number): Observable<any> {
    return this.http.post<any>(this.deletePostUrl, { _id: id }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editForumPost(forumPost: ForumPost): Observable<any> {
    return this.http.post(this.editPostUrl, forumPost, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  addReplyToForumPost(postId: number, comment: any) {
    return this.http.post(this.addReplyUrl, { _id: postId, comment }, {
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
  listAllComments(commentId): Observable<any> {
    return this.http.post<any>(this.listCommentsUrl, { _id: commentId }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  listAllForumPost(): Observable<any> {
    return this.listSomeForumPosts(100);
  }
  listSomeForumPosts(amountToList): Observable<any> {
    return this.http.get<any>(this.listPostUrl, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  showForumPost(): Observable<ForumPost> {
    const postId = this.currentInterestedPost;
    return this.http.post<ForumPost>(this.showPostUrl, { _id: postId }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getInterestedPost() {
    return this.currentInterestedPost;
  }
  setInterestedPost(id: number) {
    this.currentInterestedPost = id;
  }
}
