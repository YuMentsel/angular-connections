import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { connectionsGuard } from './connections.guard';

describe('connectionsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => connectionsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
