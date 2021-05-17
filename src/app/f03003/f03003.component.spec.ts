import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03003Component } from './f03003.component';

describe('F03003Component', () => {
  let component: F03003Component;
  let fixture: ComponentFixture<F03003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03003Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
