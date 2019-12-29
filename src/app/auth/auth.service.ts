import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { MapsAPILoader } from '@agm/core';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  placeService: any;
  placeDetailsService: any;
  placeServiceIsReady: true;
  PlaceDescriptions = [];
  userRef: AngularFireList<any>
  userData: any; // Save logged in user data
  public userInfo;
  public fNameValue = '';
  public lNameValue = '';
  public phoneNumberValue = '';
  locationDetails: any[];
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public db: AngularFireDatabase,
    private mapsAPILoader: MapsAPILoader,

  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.checkUser();
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['reviews']);
        });
      }).catch((error) => {
        window.alert(error.message);
      });

  }

  // Sign up with email/password
  SignUp(email, password, fName, lName, phoneNumber) {
    this.fNameValue = fName;
    this.lNameValue = lName;
    this.phoneNumberValue = phoneNumber;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['reviews']);
    })
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is logged in and email is verified
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

  get loggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const memberRef = this.db.list('/users/');
    memberRef.update( user.uid ,
    {
      uid: user.uid,
      email: user.email,
      fName: this.fNameValue,
      lName: this.lNameValue,
      phoneNumber: this.phoneNumberValue
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


   getAutocompleteResults(partialCity: string) {
    if (this.placeServiceIsReady) {
      this.placeService.getPlacePredictions({input: partialCity, types: ['establishment'],
      componentRestrictions: {country: 'aus'}}, result => {
        this.locationDetails = result;
        var desc = [];
        for (var i = 0; i < result.length; i++){
          desc.push(result[i].description);
        }
      });
    }
  }

  checkUser(){


    const user = JSON.parse(localStorage.getItem('user'));
    if(user != null){
    this.userRef = this.db.list('/users', ref => ref.equalTo(user.uid).orderByKey())
    this.userRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
    actions.forEach(action => {
     this.userInfo = action.payload.val();
     if(this.userInfo.is_admin === true){
      this.router.navigate(['admin']);
     }
     });
  })
}
    if (user === null){
      return [true, false];
    }

    else
    {
      return [false, true];
    }
  }
}
