import { TestBed } from '@angular/core/testing';

import { F01001Service } from './f01001.service';

describe('F01001Service', () => {
  let service: F01001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F01001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
