import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList   } from '@angular/fire/database';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent {
  @Input("add-report") x;
  @Input("locationDetail") locationDetail;
  showWarning: boolean = true;
  showOtherInput: boolean = false;
  showReportForm: boolean = false;
  currentDate = new Date();

  rudeValue: String = '';
  deniedValue: String = '';
  commentValue: String = '';
  otherCommentValue: String = '';
  constructor(public db: AngularFireDatabase, public snackBar: SnackbarService) {

  }
  continueToReport(){
    this.showWarning = false;
    this.showReportForm = true;
  }

  showOther(){
    if(this.showOtherInput == false){
      this.showOtherInput = true;
    }
    else{
      this.showOtherInput = false;
    }
  }

  sendReport(){
    const user = JSON.parse(localStorage.getItem('user'));
    const memberRef = this.db.list('/userReports/');
    memberRef.update( user.uid + '-' + this.locationDetail.place_id,
    {
      userID: user.uid,
      locationPlaceID: this.locationDetail.place_id,
      locationDescription: this.locationDetail.description,
      date: this.currentDate.getDate() + '-' + this.currentDate.getMonth() + '-' + this.currentDate.getFullYear(),
      p1: 'Rude/Bad Conduct',
      p2: 'Denied Entry',
      p3: this.otherCommentValue,
      comment: this.commentValue,
      reviewed: 'false'
    });
    this.snackBar.openSnackBar("Report Submitted");
    }
}
