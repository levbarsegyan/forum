import { Component } from '@angular/core';
import { UserSessionService } from '../user-session/user-session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username = '';
  constructor(private user: UserSessionService, private router: Router) {
    this.user.checkUser()
      .subscribe(
        data => {
          this.addName(data); console.log(this.username);
        },
        error => this.router.navigate(['/sign-in'])
      );
  }
  addName(data) {
    this.username = data.username;
  }
}
