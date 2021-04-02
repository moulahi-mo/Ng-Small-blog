import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/interfaces';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  isLoading: boolean = false;
  isError: string = null;
  article: Article;

  constructor(
    private articleServices: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.article = {
      title: null,
      description: null,
      picture: null,
    };
  }

  public onSubmit(form: NgForm) {
    this.isError = null;
    this.isLoading = true;
    console.log(form.value);

    this.articleServices.createArticle({ ...form.value }).subscribe(
      (data: any) => {
        if (data.status === 'failed') {
          this.isError = data.reason;
          this.isLoading = false;
        } else {
          console.log(data, 'is added');
          this.isLoading = false;
          this.router.navigate(['/']);
          form.reset();
        }
      },
      (err) => {
        this.isError = err;
        this.isLoading = false;
      }
    );
  }
}
