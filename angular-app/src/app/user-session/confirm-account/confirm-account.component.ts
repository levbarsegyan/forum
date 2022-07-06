import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  constructor(
    private userService: UserSessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  message = '';
  confirmed: boolean;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.sendImportantInformation(params.id, params.info);
    });
  }
  sendImportantInformation(id: number, extraInfo: string) {
    this.userService.confirmUser(id, extraInfo).subscribe(
      data => {
        if (data.accepted) {
          console.log(data.reply);
        } else {
          this.displayError(data.reply);
        }
      },
      error => {
        this.displayError('Problem confirming data with server.');
      }
    );
  }
  displayError(message: string) {
    this.message = message;
  }
}
