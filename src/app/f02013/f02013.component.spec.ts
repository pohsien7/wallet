import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02013Component } from './f02013.component';

describe('F02013Component', () => {
  let component: F02013Component;
  let fixture: ComponentFixture<F02013Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02013Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02013Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
