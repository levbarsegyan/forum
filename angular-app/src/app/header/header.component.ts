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
    private userService: UserSessionService,
    private router: Router,
    private adminSession: AdminSessionService,
  ) { }
  ngOnInit() {
    this.userService.checkUser().subscribe(
      data => {
        this.user._id = data._id;
        this.user.username = data.username;
        this.userService.isUserSignedIn = true;
      },
      error => {
        console.log(error);
      }
    );
    this.adminSession.role().subscribe(
      data => {
        this.setIsAdmin(data);
      },
      error => {
        console.log(error);
        this.setIsAdmin(false);
      }
    );
  }
  setIsAdmin(value: boolean) {
    this.isAdmin = value;
  }
  getIsAdmin(): boolean {
    return this.isAdmin;
  }
  getSignedIn(): boolean {
    return this.userService.isUserSignedIn;
  }
  logout() {
    this.userService.logout().subscribe(
      data => {
        location.reload();
        this.userService.isUserSignedIn = false;
        console.log(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }
}
