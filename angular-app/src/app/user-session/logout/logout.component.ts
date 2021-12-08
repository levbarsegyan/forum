import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  user: User;
  username = '';
  constructor(private router: Router, private userSession: UserSessionService) { }
  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.userSession.checkUser().subscribe(
      data => {
        this.username = data.username;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  logout() {
    this.userSession.logout().subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
