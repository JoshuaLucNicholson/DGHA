import { Component, OnInit, Injectable, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { OverlayService } from 'src/app/overlay.service';
import { AuthService } from "../../auth/auth.service";
import * as firebase from 'firebase';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

declare var google: any;
interface PlaceData {
  description: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ReviewsComponent implements OnInit, OnDestroy {
  public commentValue = '';
  public userID = '';
  //map API and place_id variables
  placeService: any;
  placeDetailsService: any;
  placeServiceIsReady: true;
  selectedPlaces: PlaceData[] = [];
  selectedPlaceId: PlaceData[] = [];
  PlaceDescriptions = [];
  public locationPlaceID
  //variables for divs
  showWelcome: boolean = true;
  showList: boolean = false;
  showCreate: boolean = false;
  showLoginSignup: boolean = false;
  showLogout: boolean = false;
  stars: number;
  overallStars: number;
  locationStars: number;
  amenitiesStars: number;
  customerServiceStars: number;
  //variables for review lists
  reviews: Observable<any[]>;
  reviews1: Observable<any[]>;
  locationReviewText: Observable<any[]>;
  y: Number;
  userDetails: Observable<any[]>;
  locationDetails: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  locationDetailsObservable: Observable<any[]> = this.locationDetails.asObservable();
  public event
  //getting place_id and establishment from MapsAPILoader
  public locationSearchValue;
  userRef: AngularFireList<any>

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  showLocations: boolean = false;
  constructor(private mapsAPILoader: MapsAPILoader, public db: AngularFireDatabase, private registerDialog: OverlayService, public authService: AuthService,
    private ref: ChangeDetectorRef) {

    this.generateButtons();

    this.mapsAPILoader.load().then(() => {
      this.placeService = new google.maps.places.AutocompleteService();
      this.placeDetailsService = new google.maps.places.PlacesService(document.createElement('div'));
      this.placeServiceIsReady = true;
    });
  }

  generateButtons() {
    var values = this.authService.checkUser();
    this.showLoginSignup = values[0];
    this.showLogout = values[1];
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    clearInterval(this.interval);
    this.ref.detach();
  }

  logout() {
    window.localStorage.removeItem('user');
    localStorage.setItem('user', null);
    JSON.parse(localStorage.getItem('user'));
    this.authService.checkUser();
    firebase.auth().signOut();

  }
  //onKey event click
  onKey(event: any) {
    this.Search()
    this.showWelcome = false;
  }

  private interval: any;

  Search() {
    if (this.locationSearchValue) {
      clearInterval(this.interval);
      this.getAutocompleteResults(String(this.locationSearchValue));
      this.showLocationsList();
      this.ref.detach();
      this.interval = setInterval(() => {
        this.ref.detectChanges();
      }, 0);
      this.ref.detach();
    }
  }

  //getAutocompleteResults loop getting description and saving it in results
  public getAutocompleteResults(partialCity: string) {
    if (this.placeServiceIsReady) {
      this.placeService.getPlacePredictions({
        input: partialCity, types: ['establishment'],
        componentRestrictions: { country: 'aus' }
      }, result => {
        this.locationDetails.next(result);

        var desc = [];
        if (this.showLocations == true) {
          if (result.length <= 3) {
            for (var i = 0; i < result.length; i++) {
              desc.push(result[i].description);
            }
          }
          else {
            for (var i = 0; i < 5; i++) {
              desc.push(result[i].description);
            }
          }
        }
      });
    }
  }


  showLocationsList() {
    if (this.showLocations == false) {
      this.showLocations = true;
      this.showCreate = false;
    }
    else {
      // this.showLocations = false;
    }
  }



  ratingIsNew(check: number) {
    if (this.stars > check - 1) {
      return "star"
    }
    else {
      return "star_border"
    }
  }

  starChange(star: number) {
    this.stars = star;
  }

  showReviewList() {
    if (this.showList == false) {
      this.showList = true;
      this.showCreate = false;
    }
    else {
      this.showList = false;
    }
  }

  addReview() {
    if (this.showCreate == false) {
      this.showCreate = true;
      this.showList = false;
    }
    else {
      this.showCreate = false;
    }
  }

  showLoginOverlay() {
    this.registerDialog.openLoginOverlay(LoginComponent);
    document.querySelector("body").style.cssText = "overflow-y: hidden";

  }
}
