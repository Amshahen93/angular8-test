import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authorization/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private service: AuthService) {
    this.registrationForm = fb.group({
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password1: new FormControl(null, [Validators.minLength(6), Validators.required]),
      password2: new FormControl(null, [Validators.minLength(6), Validators.required])
    });
  }

  ngOnInit() {
  }
  checkPasswords() {
    if (this.registrationForm.controls.password2.touched) {
      if (this.registrationForm.controls.password2.value !== this.registrationForm.controls.password1.value) {
        this.registrationForm.controls.password2.setErrors({invalidPassword: true});
      } else {
        this.registrationForm.controls.password2.setErrors(null);
      }
    }
  }
  submit() {
    if (this.registrationForm.valid) {
      if (this.service.createUser(this.registrationForm.controls.email.value,
        this.registrationForm.controls.password1.value,
        this.registrationForm.controls.name.value,
        this.registrationForm.controls.lastName.value)) {
        this.router.navigate(['login']);
      } else {
        this.registrationForm.controls.email.setErrors({repeatMail: true});
        return false;
      }
    }
  }
  toLogin() {
    this.router.navigate(['login']);
  }
}
