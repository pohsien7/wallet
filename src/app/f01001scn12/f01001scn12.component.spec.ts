import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn12Component } from './f01001scn12.component';

describe('F01001scn12Component', () => {
  let component: F01001scn12Component;
  let fixture: ComponentFixture<F01001scn12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
