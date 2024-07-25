import { TestBed } from '@angular/core/testing';

import { ViewTextService } from './view-text.service';

describe('ViewTextService', () => {
  let service: ViewTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
