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
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.sendImportantInformation(params.id, params.info);
    });
  }
  sendImportantInformation(id: number, extraInfo: number) {
    this.userService.confirmUser(id, extraInfo).subscribe(
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
  }
  displayError(message: string) {
  }
}
