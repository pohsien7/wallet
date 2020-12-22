import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F04001Component } from './f04001.component';

describe('F04001Component', () => {
  let component: F04001Component;
  let fixture: ComponentFixture<F04001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F04001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F04001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
