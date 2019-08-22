import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new AuthService();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user', () => {
    const length = service.registrationList.length;
    service.createUser('email', 'password', 'name', 'lastName');
    expect(service.registrationList.length).toBeGreaterThan(length);
  });

  it('should check is email verified? If email verified should don\'t creat user.', () => {
    service.createUser('email', 'password', 'name', 'lastName');
    const length = service.registrationList.length;

    service.createUser('email', 'password', 'name', 'lastName');

    expect(service.registrationList.length).toBe(length);
  });

  it('should check cane user login with correct password and email?', () => {
    service.createUser('Username@mail.com', '123456', 'name', 'lastName');

    service.checkUser('username@mail.com', '123456');

    expect(service.loggedIn).toBeTruthy();
  });

  it('should check cane user login with incorrect password and email?', () => {
    service.createUser('Username@mail.com', '123456', 'name', 'lastName');

    service.checkUser('User@mail.com', '123456');

    expect(service.loggedIn).toBeFalsy();
  });
});
