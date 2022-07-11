import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSessionService } from '../user-session.service';
@Component({
  selector: 'app-reset-submission',
  templateUrl: './reset-submission.component.html',
  styleUrls: ['./reset-submission.component.css']
})
export class ResetSubmissionComponent implements OnInit {
  constructor(
    private userService: UserSessionService,
  ) { }
  private emailRegExp: RegExp = this.userService.emailRegExp;
  warning = '';
  information = '';
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const email = form.value.enteredEmail;
    if (form.invalid) {
      this.displayWarning('Please enter your email address ');
    } else if (!this.emailRegExp.test(email)) {
      this.displayWarning('This email address isn\'t correctly formatted.Please check it and try again.');
    } else if (this.checkIfEmailExists(email)) {
      this.displayWarning('Cannot find an account with that email address, are you sure its correct?');
    } else {
      this.userService.resetSubmission(email).subscribe(
        data => {
          this.displaySuccess(email);
        },
        error => {
          this.displayWarning(error.reply);
        }
      );
    }
  }
  checkIfEmailExists(email: string): boolean {
    let found: boolean;
    this.userService.checkEmail(email).subscribe(
      data => {
        found = data.found;
        this.displaySuccess('Email address found... sending...');
      },
      error => { found = false; }
    );
    return found;
  }
  displayWarning(message: string) {
    this.warning = message;
  }
  displaySuccess(email: string) {
    this.information = 'An email has been sent to ' + email + ' with a link you change your password.';
  }
}
