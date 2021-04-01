import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideArticlesComponent } from './aside-articles.component';

describe('AsideArticlesComponent', () => {
  let component: AsideArticlesComponent;
  let fixture: ComponentFixture<AsideArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
