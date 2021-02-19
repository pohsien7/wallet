import { TestBed } from '@angular/core/testing';

import { F04004Service } from './f04004.service';

describe('F04004Service', () => {
  let service: F04004Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F04004Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
