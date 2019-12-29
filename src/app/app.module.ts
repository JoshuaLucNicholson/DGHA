import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AssistanceDogsComponent } from './PageLayout/assistance-dogs/assistance-dogs.component';
import { LawsComponent } from './PageLayout/laws/laws.component';
import { MembershipComponent } from './PageLayout/membership/membership.component';
import { HomePageComponent } from './PageLayout/home-page/home-page.component';
import { ReviewsComponent } from './PageLayout/reviews/reviews.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './PageLayout/login/login.component';
import { RegisterComponent } from './PageLayout/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { confirmEqualValidatorDirective } from './PageLayout/shared/confirmEqualValidator.directive';
import { VerifyEmailComponent } from './PageLayout/verify-email/verify-email.component';
import { ReviewComponent } from './PageLayout/reviews/review-card/review/review.component';
import { StarsComponent } from './PageLayout/reviews/review-card/review/stars/stars.component';
import { MustMatchDirective } from './PageLayout/helper/must-match.directive'
import { ReportComponent } from './PageLayout/reviews/review-card/report/report.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReviewCardComponent } from './PageLayout/reviews/review-card/review-card.component';
import { AddReviewComponent } from './PageLayout/reviews/review-card/add-review/add-review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPageComponent } from './PageLayout/admin-page/admin-page.component';
import { ReportCardComponent } from './PageLayout/admin-page/report-card/report-card.component';
import { SnackbarService } from './snackbar.service';

@NgModule({
  declarations: [
    AppComponent,
    AssistanceDogsComponent,
    LawsComponent,
    MembershipComponent,
    HomePageComponent,
    ReviewsComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    confirmEqualValidatorDirective,
    VerifyEmailComponent,
    ReviewComponent,
    StarsComponent,
    ReviewCardComponent,
    AddReviewComponent,
    MustMatchDirective,
    ReportComponent,
    AdminPageComponent,
    ReportCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDwKrK3gLxpJRIlqfiuY0pXXG5dINKy_kE',
      libraries: ['places']
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule

  ],
  providers: [RegisterComponent, SnackbarService],
  entryComponents: [RegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
