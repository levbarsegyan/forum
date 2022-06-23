import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private userService: UserSessionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
  id: number;
  extraInfo: number;
  displayWarning: string;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.extraInfo = params.info;
    });
  }
  sendNewPassword(form: NgForm) {
    if (form.value.enteredPassword1 === form.value.enteredPassword2 && form.value.enteredPassword1 !== '') {
      this.userService.resetPassword(this.id, this.extraInfo, form.value.enteredPassword1).subscribe(
        data => {
          if (true) {
            this.router.navigate(['/']);
          } else {
            this.displayError('Problem confirming data with server.');
          }
        },
        error => {
          this.displayError('Problem confirming data with server.');
        }
      );
    } else {
      this.displayError('Passwords don\'t match');
    }
  }
  displayError(message: string) {
    this.displayWarning = message;
  }
}
