import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from "../../auth/auth.service";
import { OverlayService } from 'src/app/overlay.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public emailValue = '';
  public fNameValue = '';
  public lNameValue = '';
  public phoneNumberValue = '';
  public passwordValue = '';
  public confirmPasswordValue= '';
  public userID = localStorage.getItem('user');
  register: Observable<any[]>;

  constructor(public db: AngularFireDatabase,  public authService: AuthService, public overlayService: OverlayService) {
    this.register = db.list('register').valueChanges();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.SignUp(this.emailValue, 
    this.passwordValue, this.fNameValue, 
    this.lNameValue, 
    this.phoneNumberValue
    );
    this.overlayService.Close();
    this.authService.checkUser();
  }

  loginLink(){
    this.overlayService.Close();
    this.overlayService.openLoginOverlay(LoginComponent);
  }
}