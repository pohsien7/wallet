import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F06003Component } from './f06003.component';

describe('F06003Component', () => {
  let component: F06003Component;
  let fixture: ComponentFixture<F06003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F06003Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F06003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
