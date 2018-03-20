import { TestBed, inject } from '@angular/core/testing';

import { PermanentClientsService } from './permanent-clients.service';

describe('PermanentClientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermanentClientsService]
    });
  });

  it('should be created', inject([PermanentClientsService], (service: PermanentClientsService) => {
    expect(service).toBeTruthy();
  }));
});
