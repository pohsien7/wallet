import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F04003shopComponent } from './f04003shop.component';

describe('F04003shopComponent', () => {
  let component: F04003shopComponent;
  let fixture: ComponentFixture<F04003shopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F04003shopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F04003shopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
