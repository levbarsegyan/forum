import { Injectable } from '@angular/core';
import { ForumPost } from '../models/forum.model';
import { ForumComment } from '../models/comment.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private forumPost: ForumPost;
  private newPostUrl = 'http:
  private editPostUrl = 'http:
  private deletePostUrl = 'http:
  private listPostUrl = 'http:
  private listACommentUrl = 'http:
  private listCommentsUrl = 'http:
  private deletePostReplyUrl = 'http:
  private increaseVoteUrl = 'http:
  private decreaseVoteUrl = 'http:
  private addReplyUrl = 'http:
  private editCommentUrl = 'http:
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
  addReplyToForumPost(postId: number, comment): Observable<any> {
    return this.http.post(this.addReplyUrl, { postId, comment }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  removeReplyFromForumPost(postId, commentId) {
    return this.http.post(this.deletePostReplyUrl, { postId, commentId }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editReplyOfForumPost(comment: ForumComment): Observable<any> {
    return this.http.post(this.editCommentUrl, { comment }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  listAComment(commentId): Observable<any> {
    return this.http.post<any>(this.listACommentUrl, { _id: commentId }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  listAllComments(commentIdArray): Observable<any> {
    return this.http.post<any>(this.listCommentsUrl, { ids: commentIdArray }, {
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
  showForumPost(postId): Observable<ForumPost> {
    return this.http.post<ForumPost>(this.showPostUrl, { _id: postId }, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getInterestedPost() {
    return this.forumPost;
  }
  setInterestedPost(post: ForumPost) {
    this.forumPost = post;
  }
}
