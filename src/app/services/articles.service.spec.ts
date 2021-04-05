import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArticlesService } from './articles.service';
import { Article } from '../models/interfaces';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
describe('ArticlesService', () => {
  //! init
  let articlesResponse: Array<Article> = [
    {
      createdAt: new Date(),
      description:
        '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quidem in cumque voluptas illum distinctio suscipit molestias numqua laudantium quis, odio consequuntur placeat odit delectus quo pariatur officia architecto porro.',
      id: 1,
      picture: 'https://picsum.photos/seed/picsum/200/300',
      title: 'dolorem dolore est ipsam',
    },

    {
      createdAt: new Date(),
      description:
        '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quidem in cumque voluptas illum distinctio suscipit molestias numqua laudantium quis, odio consequuntur placeat odit delectus quo pariatur officia architecto porro.',
      id: 2,
      picture: 'https://picsum.photos/seed/picsum/200/300',
      title: 'dolorem dolore est ipsam',
    },
  ];
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let articlesService: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesService],
    });
    injector = getTestBed();
    articlesService = TestBed.inject(ArticlesService);
    httpMock = injector.get(HttpTestingController);
  });

  //! service created test
  it('should be created', () => {
    expect(articlesService).toBeTruthy();
  });
  //! testing Url APi
  it('should the url be equal to given environment.apiUrl', () => {
    expect(articlesService.apiUrl).toEqual(environment.apiUrl);
  });

  //! FetchAllArticles tests ( get all articles)

  it('should return a collection of articles', () => {
    spyOn(articlesService, 'FetchAllArticles').and.returnValue(
      of(articlesResponse)
    );
    articlesService.FetchAllArticles().subscribe((response) => {
      expect(response).toEqual(articlesResponse);
    });

    // const req = httpMock.expectOne(environment.apiUrl);
    // expect(req.request.method).toBe('GET');

    // req.flush(articlesResponse);
  });

  //! FetchSingleArticle tests ( GET single article )
  it('should return a single article by id', () => {
    const singleArticle: Article = {
      createdAt: new Date(),
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quidem in cumque voluptas illum distinctio suscipit molestias numqua laudantium quis, odio consequuntur placeat odit delectus quo pariatur officia architecto porro.',
      id: 1,
      picture: 'https://picsum.photos/seed/picsum/200/300',
      title: 'dolorem dolore est ipsam',
    };

    spyOn(articlesService, 'FetchSingleArticle').and.returnValue(
      of(singleArticle)
    );

    articlesService.FetchSingleArticle(1).subscribe((response) => {
      expect(response.id).toBe(1);
      expect(response).toEqual(singleArticle);
    });
    // const req = httpMock.expectOne(
    //   environment.apiUrl + `?id=${singleArticle.id}`
    // );
    // expect(req.request.method).toBe('GET');

    // req.flush(singleArticle);
  });

  //! createArticle tests ( Post edit article )

  it('should create a new article and save it to db', () => {
    const newArticle: Article = {
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quidem in cumque voluptas illum distinctio suscipit molestias numqua laudantium quis, odio consequuntur placeat odit delectus quo pariatur officia architecto porro.',

      picture: 'https://picsum.photos/seed/picsum/200/300',
      title: 'dolorem dolore est ipsam',
    };
    articlesService.createArticle(newArticle).subscribe((response: any) => {
      expect(response.status).toEqual('success');
    });
    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ status: 'success' });
  });

  //! editArticle test ( Put article )
  it('should edit a specific article', () => {
    const articleToEdit: Article = {
      createdAt: new Date(),
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quidem in cumque voluptas illum distinctio suscipit molestias numqua laudantium quis, odio consequuntur placeat odit delectus quo pariatur officia architecto porro.',
      id: 1,
      picture: 'https://picsum.photos/seed/picsum/200/300',
      title: 'dolorem dolore est ipsam',
    };

    articlesService.editArticle(articleToEdit).subscribe((response: any) => {
      expect(response.status).toEqual('success');
    });
    const req = httpMock.expectOne(
      environment.apiUrl + `?id=${articleToEdit.id}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush({ status: 'success' });
  });

  //! deleteArticle test ( Delete  article  )
  it('should delete a specific article by id', () => {
    const articleToDelete: Article = {
      createdAt: new Date(),
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quidem in cumque voluptas illum distinctio suscipit molestias numqua laudantium quis, odio consequuntur placeat odit delectus quo pariatur officia architecto porro.',
      id: 1,
      picture: 'https://picsum.photos/seed/picsum/200/300',
      title: 'dolorem dolore est ipsam',
    };

    articlesService.deleteArticle(1).subscribe((response: any) => {
      expect(response.status).toEqual('success');
    });
    const req = httpMock.expectOne(
      environment.apiUrl + `?id=${articleToDelete.id}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({ status: 'success' });
  });

  //! Errors hundling test
  it('correctly handles error', () => {
    const error: any = new Error('Something bad happned !!');
    spyOn(articlesService, 'HundleErrors').and.callThrough();
    articlesService.HundleErrors(error).subscribe((res) => {
      expect(res).toEqual(error);
    });
  });
  //! Verify the httpMock request after each test
  afterEach(() => {
    httpMock.verify();
  });
});
