import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F04002Component } from './f04002.component';

describe('F04002Component', () => {
  let component: F04002Component;
  let fixture: ComponentFixture<F04002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F04002Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F04002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
