import { TestBed } from '@angular/core/testing';

import { EventviewService } from './eventview.service';

describe('EventviewService', () => {
  let service: EventviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
