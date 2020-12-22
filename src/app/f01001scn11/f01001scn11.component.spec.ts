import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn11Component } from './f01001scn11.component';

describe('F01001scn11Component', () => {
  let component: F01001scn11Component;
  let fixture: ComponentFixture<F01001scn11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
