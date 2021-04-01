import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { NoDataComponent } from './components/shared/no-data/no-data.component';
import { ArticleCardComponent } from './components/articles/article-card/article-card.component';
import { ArticlesService } from './services/articles.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ErrorComponent,
    LoaderComponent,
    NoDataComponent,
    ArticleCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ArticlesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
