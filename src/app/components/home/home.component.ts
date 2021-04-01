import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Article } from 'src/app/models/interfaces';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  // MatPaginator Inputs

  pageSize = 3;
  pageSizeOptions: number[] = [3, 6, 12, 20];
  constructor(private articleServices: ArticlesService) {}

  ngOnInit(): void {
    this.getAllArticles();
  }

  public getAllArticles() {
    this.articleServices.FetchAllArticles().subscribe((articles: Article[]) => {
      console.log(articles);
      this.articles = articles;
    });
  }
  public pageEvent(pageInfos: PageEvent) {
    console.log(pageInfos);
  }
}
