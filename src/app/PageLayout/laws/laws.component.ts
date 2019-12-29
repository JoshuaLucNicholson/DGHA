import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.css']
})
export class LawsComponent implements OnInit {

  @ViewChild("VIC", {static: true}) vicbox: ElementRef;

  changeME: string = "en|en";

  langDirect(): void {
    if(["en|ar", "en|az", "en|iw", "en|fa", "en|ur" ].includes(this.changeME)){
      //certain text direction becomes RTL
      document.querySelector("body").style.cssText = "--dir: rtl";
    }
    else{
      //certain text direction becomes LTR
      document.querySelector("body").style.cssText = "--dir: ltr";
    }
  }

  constructor() { }

  ngOnInit() {
  }

  

}


