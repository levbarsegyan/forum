import { Injectable } from '@angular/core';
import { ForumPost } from '../models/forum.model';
import { ForumComment } from '../models/comment.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private _interestedPost: ForumPost;
  private _domain = environment.BACKEND_DOMAIN;
  private _port = environment.BACKEND_PORT;
  private newPostUrl = 'http:
  private editPostUrl = 'http:
  private deletePostUrl = 'http:
  private listPostUrl = 'http:
  private listACommentUrl = 'http:
  private listCommentsUrl = 'http:
  private deletePostReplyUrl = 'http:
  private addReplyUrl = 'http:
  private editCommentUrl = 'http:
  private showPostUrl = 'http:
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }
  private httpOptions: any = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
    observe: 'body',
    withCredentials: true,
  };
  addNewForumPost(forumPost: ForumPost): Observable<any> {
    return this.http.post(this.newPostUrl, forumPost, this.httpOptions);
  }
  deleteForumPost(id: number): Observable<any> {
    return this.http.post<any>(this.deletePostUrl, { _id: id }, this.httpOptions);
  }
  editForumPost(forumPost: ForumPost): Observable<any> {
    return this.http.post(this.editPostUrl, forumPost, this.httpOptions);
  }
  addReplyToForumPost(postId: number, comment): Observable<any> {
    return this.http.post(this.addReplyUrl, { postId, comment }, this.httpOptions);
  }
  removeReplyFromForumPost(postId, commentId): Observable<any> {
    const comment = { _id: commentId };
    return this.http.post(this.deletePostReplyUrl, { postId, comment }, this.httpOptions);
  }
  editReplyOfForumPost(comment: ForumComment): Observable<any> {
    return this.http.post<any>(this.editCommentUrl, { comment }, this.httpOptions);
  }
  listAComment(commentId): Observable<any> {
    return this.http.post<any>(this.listACommentUrl, { _id: commentId }, this.httpOptions);
  }
  listAllComments(commentIdArray): Observable<any> {
    return this.http.post<any>(this.listCommentsUrl, { ids: commentIdArray }, this.httpOptions);
  }
  listAllForumPost(): Observable<any> {
    return this.listSomeForumPosts(100);
  }
  listSomeForumPosts(amountToList): Observable<any> {
    return this.http.get<any>(this.listPostUrl, this.httpOptions);
  }
  showForumPost(postId): Observable<any> {
    return this.http.post<any>(this.showPostUrl, { _id: postId }, this.httpOptions);
  }
  public get interestedPost(): ForumPost {
    return this._interestedPost;
  }
  public set interestedPost(value: ForumPost) {
    this._interestedPost = value;
  }
}
