import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F06002deleteComponent } from './f06002delete.component';

describe('F06002deleteComponent', () => {
  let component: F06002deleteComponent;
  let fixture: ComponentFixture<F06002deleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F06002deleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F06002deleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
