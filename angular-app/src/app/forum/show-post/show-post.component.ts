import { Component, OnInit } from '@angular/core';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumService } from '../forum.service';
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  constructor(private forumService: ForumService) { }
  title = '';
  content = '';
  forumPost: ForumPost;
  ngOnInit() {
    this.forumPost = this.forumService.showForumPost();
  }
}
