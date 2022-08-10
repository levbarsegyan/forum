import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../validation.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(
    private routerMove: Router,
    private userSessionService: UserSessionService,
    private validationService: ValidationService,
  ) { }
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
    if (this.validateSubmisson(form.value.enteredEmail, form.value.enteredPassword)) {
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
  validateSubmisson(email, password): boolean {
    if (this.validationService.matchEmail(email)) {
      this.warning = this.validationService.warningEmail();
      return false;
    }
    if (this.validationService.matchPassword(password)) {
      this.warning = this.validationService.warningPassword();
      return false;
    }
    this.warning = '';
    return true;
  }
  resetPassword() {
    this.routerMove.navigate(['/reset-submission']);
  }
}
