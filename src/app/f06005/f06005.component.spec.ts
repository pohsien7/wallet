import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F06005Component } from './f06005.component';

describe('F06005Component', () => {
  let component: F06005Component;
  let fixture: ComponentFixture<F06005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F06005Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F06005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
