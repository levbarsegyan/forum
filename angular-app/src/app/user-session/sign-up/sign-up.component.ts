import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSessionService } from '../user-session.service';
import { ValidationService } from '../validation.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(
    private userSessionService: UserSessionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private validationService: ValidationService,
  ) { }
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  warning = '';
  user = {
    username: '',
    email: '',
    password: ''
  };
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.username = form.value.enteredUsername;
    this.username = form.value.enteredEmail;
    this.password = form.value.enteredPassword;
    this.confirmPassword = form.value.enteredPassword2;
    if (this.password !== this.confirmPassword) {
      this.openSnackBar('Mismatched password. Make sure they are the same', 'Close');
      return;
    }
    if (!form.valid) {
      this.openSnackBar('Form error, check username and email', 'Close');
      return;
    }
    this.user = {
      username: form.value.enteredUsername,
      email: form.value.enteredEmail,
      password: form.value.enteredPassword
    };
    if ( this.validateSubmisson(this.user)) {
      this.userSessionService.registerRequest(this.user).subscribe(
        data => {
          this.router.navigate(['/confirm']);
        },
        error => {
          this.openSnackBar('This user is already registered.', 'Close');
          console.log(error);
        }
      );
    }
  }
  validateSubmisson(information): boolean {
    if (this.validationService.matchUsername(information.username)) {
      this.warning = this.validationService.warningUsername();
      return false;
    }
    if (this.validationService.matchEmail(information.email)) {
      this.warning = this.validationService.warningEmail();
      return false;
    }
    if (this.validationService.matchPassword(information.password)) {
      this.warning = this.validationService.warningPassword();
      return false;
    }
    return true;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
