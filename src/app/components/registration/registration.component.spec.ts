import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        AppRoutingModule
      ],
      declarations: [LoginComponent, RegistrationComponent, HomeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('mast navigate to login page', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const elem = fixture.debugElement.query(By.css('.textDecoration'));

    elem.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(['login']);
  });

  it('mast show name input error when it is empty', () => {
    component.registrationForm.controls.name.markAsTouched();

    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Enter your name');
  });

  it('mast show last name error when it is empty', () => {
    component.registrationForm.controls.lastName.markAsTouched();

    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Enter your last name');
  });

  it('mast show email error when it is empty', () => {
    component.registrationForm.controls.email.markAsTouched();

    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Enter mail');
  });

  it('mast show email error when it is full', () => {
    component.registrationForm.controls.email.setValue('user');
    component.registrationForm.controls.email.markAsTouched();

    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Enter correct email');
  });

  it('mast show email error when it is already exists', () => {
    component.registrationForm.controls.email.setValue('user@mail.com');
    component.registrationForm.controls.name.setValue('user');
    component.registrationForm.controls.lastName.setValue('user');
    component.registrationForm.controls.password1.setValue('123456');
    component.registrationForm.controls.password2.setValue('123456');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.submitButton'));

    button.triggerEventHandler('click', null);
    component.registrationForm.controls.email.markAsTouched();
    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('This mail already exists');
  });

  it('mast show password error when it is empty', () => {
    component.registrationForm.controls.password1.markAsTouched();

    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Enter new password');
  });

  it('mast show password error when password is short then 6 symbol', () => {
    component.registrationForm.controls.password1.setValue('12345');
    component.registrationForm.controls.password1.markAsTouched();

    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Your password must be at least 6 characters long');
  });

  it('mast show repeat password error when it is empty', () => {
    component.registrationForm.controls.password2.markAsTouched();

    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Enter repeat password');
  });

  it('mast show repeat password error when the repeated password differs from the password', () => {
    component.registrationForm.controls.password1.setValue('123456');
    component.registrationForm.controls.password2.setValue('111111');
    component.registrationForm.controls.password2.markAsTouched();
    component.registrationForm.controls.password1.markAsTouched();
    const input = fixture.debugElement.query(By.css('#repeat'));

    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorTag =  fixture.debugElement.query(By.css('mat-error'));

    expect(errorTag.nativeElement.innerText).toEqual('Repeat password must be the same');
  });

  it('mast show email error when it is already exists', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.registrationForm.controls.email.setValue('user1@mail.com');
    component.registrationForm.controls.name.setValue('user');
    component.registrationForm.controls.lastName.setValue('user');
    component.registrationForm.controls.password1.setValue('123456');
    component.registrationForm.controls.password2.setValue('123456');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.submitButton'));

    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(['login']);
  });
});
