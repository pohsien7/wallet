import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F05002Component } from './f05002.component';

describe('F05002Component', () => {
  let component: F05002Component;
  let fixture: ComponentFixture<F05002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F05002Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F05002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
