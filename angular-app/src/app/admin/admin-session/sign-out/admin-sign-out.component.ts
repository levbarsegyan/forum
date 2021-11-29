import { Component, OnInit } from '@angular/core';
import { AdminSessionService } from '../admin-session.service';
@Component({
  selector: 'app-admin-sign-out',
  templateUrl: './admin-sign-out.component.html',
  styleUrls: ['./admin-sign-out.component.css']
})
export class AdminSignOutComponent implements OnInit {
  constructor(private sessionService: AdminSessionService) { }
  ngOnInit() {
  }
  signOut() {
    return this.sessionService.signOut().subscribe(
      data => {
        console.log('User signed out');
      },
      error => {
        console.log('Error on user sign out');
      }
    );
  }
}
