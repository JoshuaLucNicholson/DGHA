import { Component, Input} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent {
  @Input("review") review;
  // @Input("add-review") x;
  // @Input("locationDetail") locationDetail;

  constructor(public db: AngularFireDatabase) {
    //this.reviews = db.list('reviews').valueChanges();
   // const  testvar = this.db.list('reviewLocationsID/' + 'ChIJdfj4NjyuEmsR_3_uTOgmN0U/userReviews' ).valueChanges();

  }

  ngOnInit(){
  }


  trimName(lName: string){
    return lName.substring(0, 1) + ".";
  }
}
