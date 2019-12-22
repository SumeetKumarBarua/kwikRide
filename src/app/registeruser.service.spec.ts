import { TestBed } from '@angular/core/testing';

import { RegisteruserService } from './registeruser.service';

describe('RegisteruserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisteruserService = TestBed.get(RegisteruserService);
    expect(service).toBeTruthy();
  });
});
