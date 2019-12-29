import { Component, OnInit, Input } from '@angular/core';
import { ReviewCardComponent } from '../review-card.component';
import { getLocaleDateTimeFormat } from '@angular/common';
import { AngularFireDatabase, AngularFireAction, AngularFireList   } from '@angular/fire/database';
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
})
export class AddReviewComponent{
  @Input("locationDetail") locationDetail;
  public commentValue;
  stars: number;
  overallStars: number;
  locationStars: number;
  amenitiesStars: number;
  customerServiceStars: number;
  currentDate = new Date();
  userRef: AngularFireList<any>

  constructor(public db: AngularFireDatabase) {

  }


  OverallRatingIsNew(check: number){
    if(this.overallStars > check-1){
      return "star"
    }
    else{
      return "star_border"
    }
  }
  LocationRatingIsNew(check: number){
    if(this.locationStars > check-1){
      return "star"
    }
    else{
      return "star_border"
    }
  }
  AmenitiesRatingIsNew(check: number){
    if(this.amenitiesStars > check-1){
      return "star"
    }
    else{
      return "star_border"
    }
  }
  CustomerServiceRatingIsNew(check: number){
    if(this.customerServiceStars > check-1){
      return "star"
    }
    else{
      return "star_border"
    }
  }

  overallstarChange(star: number){
    this.overallStars = star;
  }
  locationstarChange(star: number){
    this.locationStars = star;
  }
  amenitiesstarChange(star: number){
    this.amenitiesStars = star;
  }
  customerServicestarChange(star: number){
    this.customerServiceStars = star;
  }

  onSubmit() {

    let thing;
    let fName;
    let lName;
    const user = JSON.parse(localStorage.getItem('user'));
    // this.userRef = this.db.list('users/'+ this.userID + '/')
    this.userRef = this.db.list('/users', ref => ref.equalTo(user.uid).orderByKey())
    this.userRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
       thing = action.payload.val();
       fName = thing.fName;
       lName = thing.lName;
       this.sendReview(fName,lName, user);
       });
    })


  }

    sendReview(fName, lName, user){
   const memberRef = this.db.list('/reviewLocationsID/' + this.locationDetail.place_id +'/userReviews/');
    memberRef.update( user.uid,
    {
      date: this.currentDate.getDate() + '-' + this.currentDate.getMonth() + '-' + this.currentDate.getFullYear(),
      userID: user.uid,
      fName: fName,
      lName: lName,
      ratingOverall: this.overallStars,
      locationDescription: this.locationDetail.description,
      locationPlaceID: this.locationDetail.place_id,
      ratingLocation: this.locationStars,
      ratingAmenities: this.amenitiesStars,
      ratingCustomerService: this.customerServiceStars,
      textReview: this.commentValue,

    });
    }

    //

}

