import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlayRef;

  openLoginOverlay(login: any){
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().height("200px")
      .centerHorizontally(),
      panelClass: 'overlay',
    });
    const loginPortal = new ComponentPortal(login);
    this.overlayRef.attach(loginPortal);
    this.overlayRef.backdropClick().subscribe(() => {this.Close()});
  }

  Close(){
    this.overlayRef.dispose();
    document.querySelector("body").style.cssText = "overflow-y: auto";
  }

  constructor(private overlay: Overlay) { }
}
