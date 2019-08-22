import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegistrationComponent } from '../registration/registration.component';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, RegistrationComponent, HomeComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check formGroup validation', () => {
    const button = fixture.debugElement.query(By.css('.submitButton'));

    button.triggerEventHandler('click', null);

    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should check validation of email', () => {
    component.loginForm.controls.email.setValue('admin');

    component.loginForm.controls.email.markAsTouched();
    fixture.detectChanges();
    const elem  = fixture.debugElement.query(By.css('mat-error'));

    expect(elem.nativeElement.innerText).toEqual('Enter correct email');
  });


  it('should check validation of password', () => {
    component.loginForm.controls.password.setValue('admin');

    component.loginForm.controls.password.markAsTouched();
    fixture.detectChanges();
    const elem  = fixture.debugElement.query(By.css('mat-error'));

    expect(elem.nativeElement.innerText).toEqual('Your password must be at least 6 characters long');
  });

  it('should redirect page to the registration page.', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const tag = fixture.debugElement.query(By.css('.textDecoration'));

    tag.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(['registration']);
  });

  it('should login when email and password are correct', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('.submitButton'));

    component.loginForm.controls.email.setValue('admin@mail.com');
    component.loginForm.controls.password.setValue('adminadmin');

    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(['home']);

  });

  it('mast show error when email or password incorrect', () => {
    const button = fixture.debugElement.query(By.css('.submitButton'));

    component.loginForm.controls.email.setValue('admin@mail.com');
    component.loginForm.controls.password.setValue('adminadmi');

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    const errorMassage = fixture.debugElement.query(By.css('.errorMassage'));

    expect(errorMassage.nativeElement.innerText).toEqual('Incorrect email or password');
  });
});
