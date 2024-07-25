import { TestBed } from '@angular/core/testing';

import { SyntaxTextService } from './syntax-text.service';

describe('SyntaxTextService', () => {
  let service: SyntaxTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyntaxTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
