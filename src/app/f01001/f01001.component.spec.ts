import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001Component } from './f01001.component';

describe('F01001Component', () => {
  let component: F01001Component;
  let fixture: ComponentFixture<F01001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
