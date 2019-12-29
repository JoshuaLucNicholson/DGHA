import { Component, NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [MaterialModule]
})
export class AppComponent {

  changeME: string = "en|en";
  fontChange: number = 0;
  fonSizMult: number = 1;

  langDirect(): void {
    (this.changeME);
    if(["en|ar", "en|az", "en|iw", "en|fa", "en|ur" ].includes(this.changeME)){
      //certain text direction becomes RTL
      document.querySelector("body").style.cssText = "--dir: rtl";
    }
    else{
      //certain text direction becomes LTR
      document.querySelector("body").style.cssText = "--dir: ltr";
    }
  }

  fontSizeChange(fontChange: number): void {
    if(fontChange == 1 && this.fonSizMult < 2){
      
      this.fonSizMult += 0.25;
    }
    else if(fontChange == 0 && this.fonSizMult > 1){
      
      document.querySelector("body").style.cssText = "--fonSiz: ";
      this.fonSizMult -= 0.25;
    }
    document.querySelector("body").style.cssText = "--fonSiz: " + this.fonSizMult + "em";
  }

  constructor() {
  }

}

