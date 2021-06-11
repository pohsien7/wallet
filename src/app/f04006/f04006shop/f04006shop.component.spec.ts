import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F04006shopComponent } from './f04006shop.component';

describe('F04006shopComponent', () => {
  let component: F04006shopComponent;
  let fixture: ComponentFixture<F04006shopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F04006shopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F04006shopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
