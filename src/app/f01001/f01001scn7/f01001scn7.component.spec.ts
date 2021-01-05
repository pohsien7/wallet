import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn7Component } from './f01001scn7.component';

describe('F01001scn7Component', () => {
  let component: F01001scn7Component;
  let fixture: ComponentFixture<F01001scn7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
