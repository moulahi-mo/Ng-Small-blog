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
  list: Article[] = [];
  years: number[] = [];
  months: string[] = [];
  isLoading: boolean = false;
  isError: string = null;
  // * MatPaginator Inputs
  pageSize = 3;
  pageSizeOptions: number[] = [3];

  constructor(private articleServices: ArticlesService) {}

  ngOnInit(): void {
    //* init
    this.getAllArticles();
  }
  // ! fetch all articles from API
  public getAllArticles() {
    this.isError = null;
    this.isLoading = true;
    this.articleServices.FetchAllArticles().subscribe(
      (articles: Article[]) => {
        this.list = articles;
        this.isLoading = false;
        this.getYearsAndMonths(articles);
        this.filterArtcilesBYPageSize(articles, 0);
      },
      (err) => {
        this.isError = err;
        this.isLoading = false;
      }
    );
  }
  // ! hundling pagination
  public pageEvent(pageInfos: PageEvent) {
    this.articles = this.list;
    let temporaryList = this.articles;
    const skip = this.pageSize * pageInfos.pageIndex;

    this.filterArtcilesBYPageSize(temporaryList, skip);
  }

  // ! filtring articles by page size ( 3 )
  private filterArtcilesBYPageSize(
    list: Article[],
    skip: number,
    size: number = 2
  ) {
    //* filter skiped articles from articles list each time pagination is fired
    this.articles = list.filter((article, index) => {
      return index >= skip && index < skip + this.pageSize;
    });
  }
  // ! getting years & months for the (  archive Part )
  private getYearsAndMonths(articles: Article[]) {
    articles.forEach((article) => {
      this.years.push(new Date(article.createdAt).getFullYear());
      this.months.push(
        new Date(article.createdAt).toLocaleDateString('en', { month: 'long' })
      );
    });
    this.years = [...new Set(this.years)];
    this.months = [...new Set(this.months)];
  }
  //* on article deleted update list of articles
  public onArticleIsDeleted(id: number) {
    console.log(id);
    this.getAllArticles();
  }
}
