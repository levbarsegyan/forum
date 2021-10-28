import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private signInService: SignInService) { }
  email: string;
  password: string;
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.email = form.value.enteredEmail;
    this.password = form.value.enteredPassword;
    this.signInService.sendRequest(this.email, this.password).subscribe(user => {
      alert('This is the only Alert ' + user);
    });
  }
}
