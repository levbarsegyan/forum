import { TestBed } from '@angular/core/testing';
import { UserHandlingService } from './user-handling.service';
describe('UserHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: UserHandlingService = TestBed.get(UserHandlingService);
    expect(service).toBeTruthy();
  });
});
