import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssSettingComponent } from './css-setting.component';

describe('CssSettingComponent', () => {
  let component: CssSettingComponent;
  let fixture: ComponentFixture<CssSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CssSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
