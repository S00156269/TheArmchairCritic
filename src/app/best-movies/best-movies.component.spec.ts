import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMoviesComponent } from './best-movies.component';

describe('BestMoviesComponent', () => {
  let component: BestMoviesComponent;
  let fixture: ComponentFixture<BestMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
