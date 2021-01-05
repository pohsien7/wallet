import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F06004Component } from './f06004.component';

describe('F06004Component', () => {
  let component: F06004Component;
  let fixture: ComponentFixture<F06004Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F06004Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F06004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
