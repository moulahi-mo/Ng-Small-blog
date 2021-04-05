import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('form') form: NgForm;
  isLoading: boolean = false;
  isError: string = null;
  submited: boolean = false;
  id: number = null;
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
    //* get params id from route
    const id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.getSingleArticle(id);
  }
  // * fetch article by id
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
  // * on submit form edit article
  public onSubmit(form: NgForm) {
    this.isError = null;
    this.isLoading = true;

    this.articleServices
      .editArticle({ ...form.value, id: this.article.id })
      .subscribe(
        (data: any) => {
          //* if data status faild show error
          if (data.status === 'failed') {
            this.isError = data.reason;
            this.isLoading = false;
            this.submited = false;
          } else {
            //* if data status success
            this.submited = false;
            this.submited = true;
            this.isLoading = false;
            this.router.navigate(['/']);
            form.reset();
          }
        },
        (err) => {
          this.submited = false;
          this.isError = err;
          this.isLoading = false;
        }
      );
  }
}
