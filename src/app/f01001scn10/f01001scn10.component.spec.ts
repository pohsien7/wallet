import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn10Component } from './f01001scn10.component';

describe('F01001scn10Component', () => {
  let component: F01001scn10Component;
  let fixture: ComponentFixture<F01001scn10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
