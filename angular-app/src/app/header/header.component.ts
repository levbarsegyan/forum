import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user-session.service';
import { Router } from '@angular/router';
import { AdminSessionService } from '../services/admin-session.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {
    _id: 0,
    username: '',
  };
  constructor(
    private userService: UserSessionService,
    private router: Router,
    private adminSession: AdminSessionService,
  ) { }
  ngOnInit() {
    this.userService.checkUser().subscribe(
      data => {
        this.userService.currentUser = data;
        this.userService.isUserSignedIn = true;
        this.user._id = this.userService.currentUser._id;
        this.user.username = this.userService.currentUser.username;
      },
      error => {
        console.log(error);
      }
    );
    this.adminSession.role().subscribe(
      data => {
        this.adminSession.loggedIn = data.admin;
      },
      error => {
        console.log(error);
        this.adminSession.loggedIn = false;
      }
    );
  }
  getIsAdmin(): boolean {
    return this.adminSession.loggedIn;
  }
  getSignedIn(): boolean {
    return this.userService.isUserSignedIn;
  }
  logout() {
    this.userService.logout().subscribe(
      data => {
        location.reload();
        this.userService.isUserSignedIn = false;
        this.adminSession.loggedIn = false;
        console.log(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }
  dynmapLink() {
    return window.location.protocol + '
  }
}
