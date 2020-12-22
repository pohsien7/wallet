import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn4Component } from './f01001scn4.component';

describe('F01001scn4Component', () => {
  let component: F01001scn4Component;
  let fixture: ComponentFixture<F01001scn4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
