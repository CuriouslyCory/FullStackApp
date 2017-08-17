import { NO_ERRORS_SCHEMA }          from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { MaterialComponentsModule } from '../../material-components/material-components.module';

import { RouterOutletStubComponent } from '../../../../testing/router.stubs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialComponentsModule  ],
      declarations: [ HomeComponent, RouterLinkStubDirective, RouterOutletStubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
