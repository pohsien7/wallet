import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn3Component } from './f01001scn3.component';

describe('F01001scn3Component', () => {
  let component: F01001scn3Component;
  let fixture: ComponentFixture<F01001scn3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
