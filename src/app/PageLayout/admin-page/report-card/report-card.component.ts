import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html'
})

export class ReportCardComponent implements OnInit {
  @Input("report-card") report;
  public commentValue;
  public reviewedStatus;
  currentDate = new Date();
  reportsComments: Observable<any[]>;
  constructor(public db: AngularFireDatabase)  { }

  ngOnInit() {
    this.reportsComments = this.db.list('userReports/' + this.report.userID + '-' + this.report.locationPlaceID + '/AdminComments' ).valueChanges()
  }

  markReviewed(){
    if(this.report.reviewed === 'true'){
      this.reviewedPost('false');
    }
    else{
      this.reviewedPost('true');
    }


  }

  deleteReport(){
    this.db.list('userReports/' + this.report.userID + '-' + this.report.locationPlaceID ).remove()

  }
  reviewedPost(reportStatus){
    const memberRef = this.db.list('userReports/')
    memberRef.update( this.report.userID + '-' + this.report.locationPlaceID,
    {
      reviewed: reportStatus,
      });
  }
  addComment(){
    if(this.report.userID != null && this.report.locationPlaceID != null){
     const memberRef = this.db.list('userReports/' + this.report.userID + '-' + this.report.locationPlaceID + '/AdminComments');
      memberRef.push(
        {
            adminComment: this.commentValue,
            date: this.currentDate.getDate() + '-' + this.currentDate.getMonth() + '-' + this.currentDate.getFullYear(),
        });
      }
      else{
        console.log('undefined-undefined user report ID')
      }
  }
}
