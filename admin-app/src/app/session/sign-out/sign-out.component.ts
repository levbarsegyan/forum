import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {
  constructor(private sessionService: SessionService) { }
  ngOnInit() {
  }
  signOut() {
    return this.sessionService.signOut().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
