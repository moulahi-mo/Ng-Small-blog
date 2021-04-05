import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditArticleComponent } from './edit-article.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute } from '@angular/router';

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditArticleComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ArticlesService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    const service = TestBed.inject(ArticlesService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    let fixture = TestBed.createComponent(EditArticleComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
it('should isLoading be falsy ', () => {
  let fixture = TestBed.createComponent(EditArticleComponent);
  // let comp = fixture.debugElement.componentInstance;
  let app = fixture.debugElement.componentInstance;
  // let comp = TestBed.inject(EditArticleComponent);
  expect(app.isLoading).toEqual(false);
  // component.ngOnInit();
  // expect(comp.welcome).not.toContain(userService.user.name);
  // expect(comp.welcome).toContain('log in');
});
