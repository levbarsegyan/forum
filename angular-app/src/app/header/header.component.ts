import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session/user-session.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AdminSessionService } from '../admin/admin-session/admin-session.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {
    _id: '',
    username: '',
  };
  private isAdmin = false;
  private signedIn = false;
  constructor(
    private userSession: UserSessionService,
    private router: Router,
    private adminSession: AdminSessionService,
  ) { }
  ngOnInit() {
    this.userSession.checkUser().subscribe(
      data => {
        this.user._id = data._id;
        this.user.username = data.username;
        this.setSignedIn(true);
      },
      error => {
        console.log(error);
        this.setSignedIn(false);
      }
    );
    this.adminSession.role().subscribe(
      data => {
        this.setIsAdmin(data.admin);
      },
      error => {
        console.log(error);
        console.log(error.admin);
        this.setIsAdmin(error.admin);
      }
    );
  }
  setIsAdmin(value: boolean) {
    this.isAdmin = value;
  }
  getIsAdmin(): boolean {
    return this.isAdmin;
  }
  setSignedIn(value: boolean) {
    this.signedIn = value;
  }
  getSignedIn(): boolean {
    return this.signedIn;
  }
}
