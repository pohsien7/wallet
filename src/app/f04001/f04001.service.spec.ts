import { TestBed } from '@angular/core/testing';

import { F04001Service } from './f04001.service';

describe('F04001Service', () => {
  let service: F04001Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F04001Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
