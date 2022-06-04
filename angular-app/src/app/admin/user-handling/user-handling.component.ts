import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserSessionService } from 'src/app/user-session/user-session.service';
import { UserHandlingService } from '../user-handling.service';
@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.css']
})
export class UserHandlingComponent implements OnInit {
  constructor(
    private userService: UserSessionService,
    private userHandling: UserHandlingService,
  ) { }
  userList: User[] = [];
  bannedUserList: User[] = [];
  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.userList = data.allUsers;
        this.bannedUserList = data.allUsers;
      },
      error => {
      }
    );
  }
  banUser(user: User) {
    this.userHandling.banUser(user._id).subscribe(
      data => {
      },
      error => {
      }
    );
  }
  unbanUser(user: User) {
    this.userHandling.banUser(user._id).subscribe(
      data => {
      },
      error => {
      }
    );
  }
}
