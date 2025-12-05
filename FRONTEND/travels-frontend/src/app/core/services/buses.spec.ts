import { TestBed } from '@angular/core/testing';

import { Buses } from './buses';

describe('Buses', () => {
  let service: Buses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Buses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
