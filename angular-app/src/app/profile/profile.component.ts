import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionService } from '../user-session/user-session.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserSessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.id);
      this.userService.checkUser();
    });
  }
}
