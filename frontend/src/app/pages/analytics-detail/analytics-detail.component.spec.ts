import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsDetailComponent } from './analytics-detail.component';

describe('AnalyticsDetailComponent', () => {
  let component: AnalyticsDetailComponent;
  let fixture: ComponentFixture<AnalyticsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
