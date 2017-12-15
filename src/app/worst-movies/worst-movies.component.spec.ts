import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorstMoviesComponent } from './worst-movies.component';

describe('WorstMoviesComponent', () => {
  let component: WorstMoviesComponent;
  let fixture: ComponentFixture<WorstMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorstMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorstMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
