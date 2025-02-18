import { TestBed } from '@angular/core/testing';

import { AddTocartService } from './add-tocart.service';

describe('AddTocartService', () => {
  let service: AddTocartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTocartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
