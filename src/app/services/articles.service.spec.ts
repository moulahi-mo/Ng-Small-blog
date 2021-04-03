import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';



describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ArticlesService]});
    service = TestBed.inject(ArticlesService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

 
});

  // it('should create the service', () => {
  //   let fixture = TestBed.createComponent(UserComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it('should use the user name from the service', () => {
  //   let fixture = TestBed.createComponent(UserComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   let userService = fixture.debugElement.injector.get(UserService);
  //   fixture.detectChanges();
  //   expect(userService.user.name).toEqual(app.user.name);
  // });

  // it('should display the user name if user is logged in', () => {
  //   let fixture = TestBed.createComponent(UserComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   app.isLoggedIn = true;
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  // });

  // it('shouldn\'t display the user name if user is not logged in', () => {
  //   let fixture = TestBed.createComponent(UserComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
  // });

  // it('shouldn\'t fetch data successfully if not called asynchronously', () => {
  //   let fixture = TestBed.createComponent(UserComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   let dataService = fixture.debugElement.injector.get(DataService);
  //   let spy = spyOn(dataService, 'getDetails')
  //     .and.returnValue(Promise.resolve('Data'));
  //   fixture.detectChanges();
  //   expect(app.data).toBe(undefined);
  // });

  // it('should fetch data successfully if called asynchronously', async(() => {
  //   let fixture = TestBed.createComponent(UserComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   let dataService = fixture.debugElement.injector.get(DataService);
  //   let spy = spyOn(dataService, 'getDetails')
  //     .and.returnValue(Promise.resolve('Data'));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(app.data).toBe('Data');
  //   });
  // }));

  // it('should fetch data successfully if called asynchronously', fakeAsync(() => {
  //   let fixture = TestBed.createComponent(UserComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   let dataService = fixture.debugElement.injector.get(DataService);
  //   let spy = spyOn(dataService, 'getDetails')
  //     .and.returnValue(Promise.resolve('Data'));
  //   fixture.detectChanges();
  //   tick();
  //   expect(app.data).toBe('Data');

  // }));
});
