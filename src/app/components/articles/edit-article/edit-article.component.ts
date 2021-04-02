import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/interfaces';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  isLoading: boolean = false;
  isError: string = null;
  article: Article;
  constructor(
    private route: ActivatedRoute,
    private articleServices: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.article = {
      title: null,
      description: null,
      picture: null,
    };
    const id = +this.route.snapshot.paramMap.get('id');
    this.getSingleArticle(id);
  }

  public getSingleArticle(id: number) {
    this.isError = null;
    this.isLoading = true;
    this.articleServices.FetchSingleArticle(id).subscribe(
      (article: Article) => {
        console.log(article);
        this.article = article;
        this.isLoading = false;
      },
      (err) => {
        this.isError = err;
        this.isLoading = false;
      }
    );
  }

  public onSubmit(form: NgForm) {
    this.isError = null;
    this.isLoading = true;
    console.log(form.value);

    this.articleServices
      .editArticle({ ...form.value, id: this.article.id })
      .subscribe(
        (data) => {
          console.log(data, 'is edited');
          this.isLoading = false;
          this.router.navigate(['/']);
          form.reset();
        },
        (err) => {
          this.isError = err;
          this.isLoading = false;
        }
      );
  }
}
