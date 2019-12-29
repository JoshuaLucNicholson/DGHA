import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})

export class StarsComponent {
  constructor(private ref: ChangeDetectorRef) {

  }

  starCount: number = 0;
  @Input("stars") stars;

  starCheck(starInput: number) {
    if (this.stars > starInput - 1) {
      return "star"
    }
    else {
      return "star_border"
    }
  }
}