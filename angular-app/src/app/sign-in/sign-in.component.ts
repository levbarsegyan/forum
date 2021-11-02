import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private routerMove: Router, private signInService: SignInService) { }
  user = {};
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.user = {
      email: form.value.enteredEmail,
      password: form.value.enteredPassword,
    };
    this.signInService.loginRequest(this.user).subscribe(
      data => { console.log(data); this.routerMove.navigate(['/']); },
      error => { console.error(error); this.routerMove.navigate(['/sign-in']); }
    );
  }
}
