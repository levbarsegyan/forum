import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../user-session/user-session.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserSessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  user: any;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.id);
      this.user = this.userService.checkUser().subscribe(userData => {
        this.user = userData;
      },
      error => {
        console.log(error);
      });
    });
  }
}
