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

  public FetchAllArticles(): Observable<Article[]> {
    return this._http
      .get<Article[]>(this.apiUrl, httpOptions)
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
