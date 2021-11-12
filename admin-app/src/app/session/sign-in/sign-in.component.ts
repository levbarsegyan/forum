import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private sessionService: SessionService, private routerMove: Router) { }
  user = {
    username: '',
    password: '',
  };
  warning = '';
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
        this.routerMove.navigate(['/']);
      },
      error => {
        console.error(error.error);
        this.warning = error.error;
      }
    );
  }
}
