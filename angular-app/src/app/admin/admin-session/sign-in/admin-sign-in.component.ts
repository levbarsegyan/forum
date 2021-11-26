import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminSessionService } from '../admin-session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {
  constructor(private sessionService: AdminSessionService, private routerMove: Router) { }
  user = {
    username: '',
    password: '',
  };
  warning = '';
  username = '';
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.user = {
      username: form.value.enteredUsername,
      password: form.value.enteredPassword
    };
    this.sessionService.signIn(this.user).subscribe(
      data => {
        console.log(data);
        this.checkUsername();
        this.routerMove.navigate(['/']);
      },
      error => {
        console.error(error.error);
        this.warning = error.error;
      }
    );
  }
  testClick() {
    this.sessionService.register().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
  checkUsername() {
    this.sessionService.checkUser().subscribe(
      data => {
        this.username = data.username;
        this.sessionService.setLoggedInState(data.authenticated);
        console.log(this.username);
      },
      error => {
        this.username = error.error;
        console.log(this.username);
      }
    );
  }
}
