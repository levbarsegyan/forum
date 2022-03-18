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
  user = {
    username: '',
    email: '',
  };
  allUsers: [];
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getUserProfile(params.id);
    });
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.allUsers = data.allUsers;
      },
      error => {
        console.log(error);
      }
    );
  }
  getUserProfile(id: number) {
    this.userService.checkUser().subscribe(
      user => {
        this.user = user;
        if (user._id !== id) {
          this.userService.getUsernameFromID(id).subscribe(
            userData => {
              console.log(userData);
              this.user = userData.user;
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
