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
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsUpdateComponent } from './news/news-update/news-update.component';
import { BackgroundComponent } from './news/background/background.component';
import { NewsComponent } from './news/news.component';
import { InfoComponent } from './info/info.component';
import { VoteComponent } from './vote/vote.component';
import { PostVoteComponent } from './posts/post-vote/post-vote.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './user-session/sign-in/sign-in.component';
import { SignUpComponent } from './user-session/sign-up/sign-up.component';
import { LogoutComponent } from './user-session/logout/logout.component';
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
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    NewsCreateComponent,
    NewsListComponent,
    NewsUpdateComponent,
    BackgroundComponent,
    NewsComponent,
    InfoComponent,
    VoteComponent,
    PostVoteComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    LogoutComponent,
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
    MatSidenavModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
