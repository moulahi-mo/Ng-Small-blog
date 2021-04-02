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
    this.getAllArticles();
  }

  public getAllArticles() {
    this.isError = null;
    this.isLoading = true;
    this.articleServices.FetchAllArticles().subscribe(
      (articles: Article[]) => {
        console.log(articles);
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
  public pageEvent(pageInfos: PageEvent) {
    this.articles = this.list;
    let temporaryList = this.articles;
    const skip = this.pageSize * pageInfos.pageIndex;
    console.log(pageInfos);
    this.filterArtcilesBYPageSize(temporaryList, skip);
  }

  private filterArtcilesBYPageSize(
    list: Article[],
    skip: number,
    size: number = 3
  ) {
    //* filter skiped articles from articles list each time pagination is fired
    this.articles = list.filter((article, index) => {
      console.log(index, skip);

      return index > skip && index <= skip + this.pageSize;
    });
    console.log(this.articles);
  }

  private getYearsAndMonths(articles: Article[]) {
    articles.forEach((article) => {
      this.years.push(new Date(article.createdAt).getFullYear());
      this.months.push(
        new Date(article.createdAt).toLocaleDateString('en', { month: 'long' })
      );
    });
    this.years = [...new Set(this.years)];
    this.months = [...new Set(this.months)];
    console.log(this.months, this.years);
  }
}
