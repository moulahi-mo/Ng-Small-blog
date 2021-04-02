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
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { EditArticleComponent } from './components/articles/edit-article/edit-article.component';
import { DetailsArticleComponent } from './components/articles/details-article/details-article.component';
import { AsideArticlesComponent } from './components/articles/aside-articles/aside-articles.component';
import {
  DeleteArticleComponent,
  ModalDelete,
} from './components/articles/delete-article/delete-article.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ErrorComponent,
    LoaderComponent,
    NoDataComponent,
    ArticleCardComponent,
    AddArticleComponent,
    EditArticleComponent,
    DetailsArticleComponent,
    AsideArticlesComponent,
    DeleteArticleComponent,
    ModalDelete,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [ModalDelete],
  providers: [
    ArticlesService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
