import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/interfaces';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: environment.ApiKey,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}
  //* GET all articles
  public FetchAllArticles(): Observable<Article[]> {
    return this._http
      .get<Article[]>(this.apiUrl, httpOptions)
      .pipe(catchError(this.HundleErrors));
  }

  //* GET single article
  public FetchSingleArticle(id: number): Observable<Article> {
    return this._http
      .get<Article>(this.apiUrl + `?id=${id}`, httpOptions)
      .pipe(catchError(this.HundleErrors));
  }

  //* Put edit article
  public editArticle(article: Article): Observable<Article> {
    return this._http
      .put<Article>(this.apiUrl + `?id=${article.id}`, article, httpOptions)
      .pipe(catchError(this.HundleErrors));
  }
  //* Post create article
  public createArticle(article: Article): Observable<Article> {
    return this._http
      .post<Article>(this.apiUrl, article, httpOptions)
      .pipe(catchError(this.HundleErrors));
  }

  //* Delete  article
  public deleteArticle(id: number): Observable<any> {
    return this._http
      .delete<Article>(this.apiUrl + `?id=${id}`, httpOptions)
      .pipe(catchError(this.HundleErrors));
  }

  //! hundling errors
  private HundleErrors(error: HttpErrorResponse) {
    let err = 'Something bad happned !!';
    if (error) {
      return throwError(
        error.error?.message ? error.error?.message : error.message
      );
    } else {
      return throwError(err);
    }
  }
}
