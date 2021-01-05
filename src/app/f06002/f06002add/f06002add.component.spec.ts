import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F06002addComponent } from './f06002add.component';

describe('F06002addComponent', () => {
  let component: F06002addComponent;
  let fixture: ComponentFixture<F06002addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F06002addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F06002addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
