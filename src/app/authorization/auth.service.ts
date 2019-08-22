import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  password = 'adminadmin';
  email = 'admin@mail.com';
  registrationList: {password: string, email: string, name: string, lastName: string}[] =
  [{email: 'user@mail.com', name: 'User', lastName: 'Userlastneim', password: 'adminadmin'}];
  loggedIn = false;
  isLoggedIn = new Subject <boolean> ();
  user: {password: string, email: string, name: string, lastName: string}  = null;
  constructor() { }

  checkUser(email: string, password: string) {
    if (this.email === email.toLowerCase() && this.password === password) {
      this.user = {name: 'admin', email: this.email, password: this.password, lastName: 'all priority'};
      this.login(true);
      this.isLoggedIn.next(true);
    } else {
      for (const user of this.registrationList) {
        if (user.email === email.toLowerCase() && user.password === password) {
          this.user = user;
          this.login(true);
          this.isLoggedIn.next(true);
          return true;
        }
      }
      this.login(false);
      this.isLoggedIn.next(false);
    }
  }

  login(isLogin: boolean) {
    this.loggedIn = isLogin;
  }
  createUser(email: string, password: string, name: string, lastName: string) {
    for (const user of this.registrationList) {
      if (user.email === email.toLowerCase()) {
        return false;
      }
    }
    this.registrationList.push({email: email.toLowerCase(), password, name, lastName});
    return true;
  }
}
