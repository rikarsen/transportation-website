import { TestBed, inject } from '@angular/core/testing';

import { AuthNotGuardService } from './auth-not-guard.service';

describe('AuthNotGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthNotGuardService]
    });
  });

  it('should be created', inject([AuthNotGuardService], (service: AuthNotGuardService) => {
    expect(service).toBeTruthy();
  }));
});
