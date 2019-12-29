import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component'

@Component({
  selector: 'app-assistance-dogs',
  templateUrl: './assistance-dogs.component.html',
  styleUrls: ['./assistance-dogs.component.css']
})
export class AssistanceDogsComponent implements OnInit {
  
  changeME: string = "en|en";
  pageTitle = "Access";

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
