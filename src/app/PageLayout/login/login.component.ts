import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { OverlayService } from 'src/app/overlay.service';
import { auth } from 'firebase';
import { RegisterComponent } from '../register/register.component';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailValue = '';
  public passwordValue = '';

  constructor(
    public authService: AuthService,
    public overlayService: OverlayService,
    public snackbar: SnackbarService
  ) { }

  onSubmit(){
    this.authService.SignIn(this.emailValue, this.passwordValue)
    //this.authService.checkUser();
    const user = this.authService.loggedIn;
    console.log(user);
    if(user != null){
      this.snackbar.openSnackBar("Login Successful");
      this.overlayService.Close();
    }

  }
  ngOnInit() {
  }

  forgotPasswordOnClick(){
    if(this.emailValue == ""){
      this.snackbar.openSnackBar("Please Enter Your Email");
    }
    else{
      this.authService.ForgotPassword(this.emailValue);
    }
  }

}
