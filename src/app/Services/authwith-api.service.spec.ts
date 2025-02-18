import { TestBed } from '@angular/core/testing';

import { AuthwithApiService } from './authwith-api.service';

describe('AuthwithApiService', () => {
  let service: AuthwithApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthwithApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
