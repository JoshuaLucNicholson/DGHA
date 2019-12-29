import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './PageLayout/home-page/home-page.component';
import { LawsComponent } from './PageLayout/laws/laws.component';
import { AssistanceDogsComponent } from './PageLayout/assistance-dogs/assistance-dogs.component';
import { MembershipComponent } from './PageLayout/membership/membership.component';
import { ReviewsComponent } from './PageLayout/reviews/reviews.component';
import { LoginComponent } from './PageLayout/login/login.component';
import { RegisterComponent } from './PageLayout/register/register.component';
import { VerifyEmailComponent } from './PageLayout/verify-email/verify-email.component';
import { AdminPageComponent } from './PageLayout/admin-page/admin-page.component';
const routes: Routes = [
  {path: 'home-page', component: HomePageComponent},
  {path: 'assistance-dogs', component: AssistanceDogsComponent},
  {path: 'laws', component: LawsComponent},
  {path: 'membership', component: MembershipComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},

  {
    path: 'home-page',
    component: HomePageComponent,
    data: { title: 'Home Page' }
  },
  { path: '',
    redirectTo: '/home-page',
    pathMatch: 'full'
  },

  {
    path: 'assistance-dogs',
    component: AssistanceDogsComponent,
    data: { title: 'Assistance Dogs' }
  },

  {
    path: 'laws',
    component: LawsComponent,
    data: { title: 'laws' }
  },

  {
    path: 'membership',
    component: MembershipComponent,
    data: { title: 'membership' }
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    data: { title: 'reviews' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'register' }
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    data: { title: 'reviews' }
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    data: { title: 'admin' }
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    data: { title: 'verify-email-address' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
