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
  warning = '';
  information = '';
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const email = form.value.enteredEmail;
    if (form.invalid) {
      this.displayWarning('Please enter your email address ');
    } else if (form.invalid) {
      this.displayWarning('Form doesn\'t have a correctly formatted email address.');
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
  displayWarning(message: string) {
    this.warning = message;
  }
  displaySuccess(email: string) {
    this.information = 'An email has been sent to ' + email + ' with a link you change your password.';
  }
}
