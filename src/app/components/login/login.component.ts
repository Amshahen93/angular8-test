import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authorization/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  error: string = null;
  loginSubscription;
  constructor(fb: FormBuilder, private router: Router, private service: AuthService) {
    this.loginForm = fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
   }

  ngOnInit() {
    this.loginSubscription = this.service.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.router.navigate(['home']);
      } else {
        this.error = 'Incorrect email or password';
      }
    });
  }
  ngOnDestroy() {
    this.error = null;
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  registration() {
    this.router.navigate(['registration']);
  }

  submit() {
    if (this.loginForm.valid) {
      return this.service.checkUser(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    }
  }
}
