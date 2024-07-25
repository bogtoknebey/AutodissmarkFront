import { TestBed } from '@angular/core/testing';

import { CreateTextService } from './create-text.service';

describe('CreateTextService', () => {
  let service: CreateTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
