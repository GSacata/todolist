import { TestBed } from '@angular/core/testing';

import { EmailmodapiService } from './emailmodapi.service';

describe('EmailmodapiService', () => {
  let service: EmailmodapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailmodapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
