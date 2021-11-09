import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSessionService } from '../user-session.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private userSessionService: UserSessionService, private snackBar: MatSnackBar, private router: Router) { }
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    this.userSessionService.registerRequest(this.user).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => {
        this.openSnackBar('This user is already registered... I think', 'Close');
        console.log(error);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
