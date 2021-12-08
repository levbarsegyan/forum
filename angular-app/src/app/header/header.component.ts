import { Component } from '@angular/core';
import { UserSessionService } from '../user-session/user-session.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username = 'spidername';
  user: User = {
    email: '',
    username: '',
    confirmed: '',
    creation_date: '',
  };
  constructor(private userSession: UserSessionService, private router: Router) {
    this.userSession.checkUser()
      .subscribe(
        data => {
          this.addUser(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  addUser(data) {
    this.user.username = data.username;
    this.user.email = data.email;
    this.user.confirmed = data.confirmed;
    this.user.creation_date = data.creation_date;
  }
}
