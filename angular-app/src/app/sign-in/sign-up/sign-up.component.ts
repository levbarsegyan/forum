import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInService } from '../sign-in.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private signinService: SignInService) { }
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.email = form.value.enteredValue;
    this.password = form.value.enteredPassword;
    this.confirmPassword = form.value.enteredPassword2;
    if (this.password !== this.confirmPassword) {
      return;
    }
  }
  validatePassword(password: string, password2: string) {
    if (password !== password2) {
      return false;
    }
    return true;
  }
}
