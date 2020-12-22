import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn13Component } from './f01001scn13.component';

describe('F01001scn13Component', () => {
  let component: F01001scn13Component;
  let fixture: ComponentFixture<F01001scn13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
