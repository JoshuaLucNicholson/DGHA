import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fontChange: number = 0;
  fonSizMult: number = 1;


  fontSizeChange(fontChange: number): void {
    if (fontChange == 1 && this.fonSizMult < 2) {

      this.fonSizMult += 0.25;
    }
    else if (fontChange == 0 && this.fonSizMult > 1) {

      document.querySelector("body").style.cssText = "--fonSiz: ";
      this.fonSizMult -= 0.25;
    }
    document.querySelector("body").style.cssText = "--fonSiz: " + this.fonSizMult + "em";
  }

  onEvent(event){
    event.stopPropagation();
    return false;
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  constructor() { }

  @Input() pageTitle: string;
  @Input() color: ThemePalette;
  @Output() clicked = new EventEmitter();

  ngOnInit() {
  }

}
