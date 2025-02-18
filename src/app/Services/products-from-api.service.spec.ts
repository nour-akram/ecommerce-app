import { TestBed } from '@angular/core/testing';

import { ProductsFromApiService } from './products-from-api.service';

describe('ProductsFromApiService', () => {
  let service: ProductsFromApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsFromApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
