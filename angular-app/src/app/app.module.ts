import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
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
import { appRoutes } from "./routerConfig";
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
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
