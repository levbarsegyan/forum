import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule, MatCardModule,
  MatButtonModule, MatToolbarModule,
  MatExpansionModule, MatTabsModule,
  MatGridListModule, MatSnackBarModule,
  } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewsCreateComponent } from './admin/news/news-create/news-create.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsUpdateComponent } from './admin/news/news-update/news-update.component';
import { BackgroundComponent } from './news/background/background.component';
import { NewsComponent } from './news/news.component';
import { InfoComponent } from './info/info.component';
import { VoteComponent } from './vote/vote.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './user-session/sign-in/sign-in.component';
import { SignUpComponent } from './user-session/sign-up/sign-up.component';
import { LogoutComponent } from './user-session/logout/logout.component';
import { AdminHeaderComponent } from './admin/header/header.component';
import { AdminSignInComponent } from './admin/admin-session/sign-in/admin-sign-in.component';
import { AdminSignOutComponent } from './admin/admin-session/sign-out/admin-sign-out.component';
import { HomeComponent } from './admin/home/home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
const appRoutes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'vote',
    component: VoteComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
  },
  {
    path: 'admin/sign-in',
    component: AdminSignInComponent,
  },
  {
    path: 'create-news',
    component: NewsCreateComponent,
  },
  {
    path: '**', component: PageNotFoundComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsCreateComponent,
    NewsListComponent,
    NewsUpdateComponent,
    BackgroundComponent,
    NewsComponent,
    InfoComponent,
    VoteComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    LogoutComponent,
    AdminHeaderComponent,
    AdminSignInComponent,
    AdminSignOutComponent,
    HomeComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTabsModule,
    MatGridListModule,
    MatSnackBarModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
