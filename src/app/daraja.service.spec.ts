import { TestBed } from '@angular/core/testing';

import { DarajaService } from './daraja.service';

describe('DarajaService', () => {
  let service: DarajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
