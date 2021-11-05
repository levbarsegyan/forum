import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSessionService } from '../user-session.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private userSessionService: UserSessionService) { }
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  user = {};
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.user = {
      username: form.value.enteredUsername,
      email: form.value.enteredEmail,
      password: form.value.enteredPassword
    };
    this.username = form.value.enteredUsername;
    this.email = form.value.enteredEmail;
    this.password = form.value.enteredPassword;
    this.confirmPassword = form.value.enteredPassword2;
    if (!form.valid || this.password !== this.confirmPassword) {
      return;
    }
    this.userSessionService.registerRequest(this.user).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  validatePassword(password: string, password2: string) {
    if (password !== password2) {
      return false;
    }
    return true;
  }
}
