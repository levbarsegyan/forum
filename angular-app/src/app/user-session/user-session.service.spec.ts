import { TestBed } from '@angular/core/testing';
import { UserSessionService } from './user-session.service';
describe('UserSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: UserSessionService = TestBed.get(UserSessionService);
    expect(service).toBeTruthy();
  });
});
