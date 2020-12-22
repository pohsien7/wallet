import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F05001Component } from './f05001.component';

describe('F05001Component', () => {
  let component: F05001Component;
  let fixture: ComponentFixture<F05001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F05001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F05001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
