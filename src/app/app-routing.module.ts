import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { DetailsArticleComponent } from './components/articles/details-article/details-article.component';
import { EditArticleComponent } from './components/articles/edit-article/edit-article.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  { path: 'articles/add', component: AddArticleComponent },
  { path: 'articles/:id', component: DetailsArticleComponent },
  { path: 'articles/edit/:id', component: EditArticleComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
