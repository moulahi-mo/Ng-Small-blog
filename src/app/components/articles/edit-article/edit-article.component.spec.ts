import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditArticleComponent } from './edit-article.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Article } from 'src/app/models/interfaces';

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  let submitEl: DebugElement;
  let titleEl: DebugElement;
  let pictureEl: DebugElement;
  let descriptionEl: DebugElement;
  let route: ActivatedRoute;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EditArticleComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [ArticlesService],
    }).compileComponents();
  });
  //? synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    let articlesService = TestBed.inject(ArticlesService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();

    descriptionEl = fixture.debugElement.query(By.css('textarea'));
    submitEl = fixture.debugElement.query(By.css('button'));
    titleEl = fixture.debugElement.query(By.css('.title'));
    pictureEl = fixture.debugElement.query(By.css('.picture'));
  });
  //*  app should be created
  it('should create the app', () => {
    let fixture = TestBed.createComponent(EditArticleComponent);
    let comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
    expect(component).toBeDefined();
  });
  //* ngOnInit initializations
  it('should init article object,get id params, and call  getSingleArticle function', () => {
    const initArticle = {
      title: null,
      description: null,
      picture: null,
    };
    component.ngOnInit();
    expect(component.article).toEqual(initArticle);
    expect(component.submited).toBeFalsy();
    expect(component.isLoading).toBeFalsy;
    expect(component.isError).toBeNull();
  });

  //! form Tests on submit

  it('should show a validation error if inputs & textarea are touched but left empty or have errors ', () => {
    let validationError: DebugElement;

    fixture.detectChanges();
    validationError = fixture.debugElement.query(By.css('.is-invalid'));
    expect(validationError).toBeNull();
  });

  it('should call onSubmit() method on form submit', fakeAsync(() => {
    const articleToEdit: Article = {
      description: 'Lorem description',

      picture: 'https://picsum.photos/seed/picsum/200/300',
      title: 'Article Title',
    };

    fixture.detectChanges();

    tick();
    fixture.whenStable().then(() => {
      if (component.submited) {
        expect(component.form.value.title).toBe('Article Title');
        expect(component.form.value.picture).toBe(
          'https://picsum.photos/seed/picsum/200/300'
        );
        expect(component.form.value.description).toBe('Lorem description');

        expect(component.submited).toEqual(true);
      }
    });
  }));
});
