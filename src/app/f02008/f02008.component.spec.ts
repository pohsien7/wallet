import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02008Component } from './f02008.component';

describe('F02008Component', () => {
  let component: F02008Component;
  let fixture: ComponentFixture<F02008Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02008Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02008Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
