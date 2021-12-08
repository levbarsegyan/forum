import { Component, OnInit } from '@angular/core';
import { AdminSessionService } from '../admin-session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-sign-out',
  templateUrl: './admin-sign-out.component.html',
  styleUrls: ['./admin-sign-out.component.css']
})
export class AdminSignOutComponent implements OnInit {
  constructor(private sessionService: AdminSessionService, private router: Router) { }
  ngOnInit() {
  }
  signOut() {
    return this.sessionService.signOut().subscribe(
      data => {
        console.log('Admin signed out');
        this.router.navigate(['/']);
      },
      error => {
        console.log('Error on Admin sign out');
      }
    );
  }
}
