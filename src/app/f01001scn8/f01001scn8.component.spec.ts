import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn8Component } from './f01001scn8.component';

describe('F01001scn8Component', () => {
  let component: F01001scn8Component;
  let fixture: ComponentFixture<F01001scn8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
