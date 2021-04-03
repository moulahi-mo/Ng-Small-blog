import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/interfaces';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss'],
})
export class DetailsArticleComponent implements OnInit {
  isLoading: boolean = false;
  isError: string = null;
  article: Article;
  constructor(
    private route: ActivatedRoute,
    private articleServices: ArticlesService
  ) {}

  ngOnInit(): void {
    //* get id from params route
    const id = +this.route.snapshot.paramMap.get('id');
    this.getSingleArticle(id);
  }
  //* get article by ID
  public getSingleArticle(id: number) {
    this.isError = null;
    this.isLoading = true;
    this.articleServices.FetchSingleArticle(id).subscribe(
      (article: Article) => {
        this.article = article;
        this.isLoading = false;
      },
      (err) => {
        this.isError = err;
        this.isLoading = false;
      }
    );
  }
}
