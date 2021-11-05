import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  username = '';
  constructor(private router: Router, private userSession: UserSessionService) { }
  ngOnInit() {
  }
  getUser() {
    this.userSession.checkUser().subscribe(
      data => {
        this.username = data.username;
        console.log(data.username);
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
        this.router.navigate(['/thispagedoesnotexist']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
