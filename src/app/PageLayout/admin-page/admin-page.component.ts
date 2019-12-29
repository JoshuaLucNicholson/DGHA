import { Component, OnInit, Pipe } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from "../../auth/auth.service";
import * as firebase from 'firebase';
import { Router } from "@angular/router";
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html'
})

export class AdminPageComponent implements OnInit {
  public reportsSub;

  reports: Observable<any[]>;
  membershipFormsA: Observable<any[]>;
  membershipFormsF: Observable<any[]>;
  reportComments: Observable<any[]>;
  public commentValue;
  constructor(public db: AngularFireDatabase, public authService: AuthService,    public router: Router,) {

  }

  ngOnInit() {
    this.reports = this.db.list('userReports/' ).valueChanges()
     this.db.list('userReports/' ).valueChanges().subscribe((data) => {
      this.reportsSub = data;

  });

  this.membershipFormsA = this.db.list('memberships/associate' ).valueChanges()
  this.membershipFormsF = this.db.list('memberships/full' ).valueChanges()

  }

  logout() {
    window.localStorage.removeItem('user');
    localStorage.setItem('user', null);
    JSON.parse(localStorage.getItem('user'));
    this.authService.checkUser();
    firebase.auth().signOut();
    this.router.navigate(['reviews']);
  }

  accepted(){

  }
  rejected(){

  }
}
