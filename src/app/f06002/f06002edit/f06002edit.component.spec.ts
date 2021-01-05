import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F06002editComponent } from './f06002edit.component';

describe('F06002editComponent', () => {
  let component: F06002editComponent;
  let fixture: ComponentFixture<F06002editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F06002editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F06002editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
