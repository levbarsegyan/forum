import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private routerMove: Router, private userSessionService: UserSessionService) { }
  user = {};
  warning = '';
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.warning = 'Forum invalid';
      return;
    }
    this.user = {
      email: form.value.enteredEmail,
      password: form.value.enteredPassword,
    };
    this.userSessionService.loginRequest(this.user).subscribe(
      data => {
        console.log(data);
        this.userSessionService.isUserSignedIn = true;
        this.routerMove.navigate(['/']);
      },
      error => {
        console.error(error.error.message);
        this.warning = error.error.message;
      }
    );
  }
}
