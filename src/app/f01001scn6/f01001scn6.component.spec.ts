import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn6Component } from './f01001scn6.component';

describe('F01001scn6Component', () => {
  let component: F01001scn6Component;
  let fixture: ComponentFixture<F01001scn6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
