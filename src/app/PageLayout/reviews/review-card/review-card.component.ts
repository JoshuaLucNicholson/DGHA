import { Component, OnInit, Input, Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/overlay.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { AuthService } from '../../../auth/auth.service';

declare var google: any;
  interface PlaceData {
  description: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ReviewCardComponent implements OnInit {
  @Input("review-card") x;
  @Input("locationDetail") locationDetail;
  @Input("placeID") locationPlaceID;

  //map API and place_id variables
  placeService: any;
  placeDetailsService: any;
  placeServiceIsReady: true;
  selectedPlaces: PlaceData[] = [];
  selectedPlaceId: PlaceData[] = [];
  PlaceDescriptions = [];

  //variables for divs
  showList: boolean = false;
  showCreate: boolean = false;
  showReport: boolean = false;
  stars: number;

  //variables for review lists
  reviews: Observable<any[]> = new Observable<any[]>();
  userReviews: Observable<any[]>;
  locationReviewText: Observable<any[]>;

  //variables for overall rating
  data: any[] = [];
  overallRatingValue: number = 0;

  //getting place_id and establishment from MapsAPILoader
  constructor(private mapsAPILoader: MapsAPILoader, public db: AngularFireDatabase, private registerDialog: OverlayService, public authService: AuthService) {
    //this.reviews = db.list('reviews').valueChanges();
    //this.reviews = this.db.list('reviewLocationsID/' + 'ChIJdfj4NjyuEmsR_3_uTOgmN0U/userReviews' ).valueChanges();

    this.mapsAPILoader.load().then(() => {
      this.placeService = new google.maps.places.AutocompleteService();
      this.placeDetailsService = new google.maps.places.PlacesService(document.createElement('div'));
      this.placeServiceIsReady = true;
      //this.reviews = this.db.list('reviewLocationsID/' + this.locationDetails[this.x].place_id ).valueChanges();
    });
  }

  ngOnInit(){
    this.reviews = this.db.list('reviewLocationsID/' + this.locationDetail.place_id + '/userReviews' ).valueChanges();
    this.reviews.subscribe(reviews => {
      this.overallRatingValue = 0;
      for(var i = 0; i < reviews.length; i++){
        this.overallRatingValue =+ this.overallRatingValue + reviews[i].ratingOverall;
      }
      this.overallRatingValue = this.overallRatingValue / reviews.length;
      this.overallRatingValue = Math.round(this.overallRatingValue)
    })
  }

  getReviews(){
    this.reviews = this.db.list('reviewLocationsID/' + this.locationDetail.place_id + '/userReviews' ).valueChanges();
  }

  ratingIsNew(check: number){
    if(this.stars > check-1){
      return "star"
    }
    else{
      return "star_border"
    }
  }

  starChange(star: number){
    this.stars = star;
  }

  showReviewList(){
    if(this.showList == false){
      this.showList = true;
      this.showCreate = false;
      this.showReport = false;
      this.getReviews();
    }
    else{
      this.showList = false;
    }
  }

  addReview(){
    if(this.showCreate == false){
      this.showCreate = true;
      this.showList = false;
      this.showReport = false;
    }
    else{
      this.showCreate = false;
    }
  }

  addReport(){
    if(this.showReport == false){
      this.showReport = true;
      this.showList = false;
      this.showCreate = false;
      this.getReviews();
    }
    else{
      this.showReport = false;
    }
  }
}