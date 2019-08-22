import { TestBed} from '@angular/core/testing';
import { Location } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HomeComponent } from '../components/home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let location: Location;
  let service: AuthService;
  beforeEach(() => {
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
      declarations: [HomeComponent, LoginComponent, RegistrationComponent, HomeComponent],
      providers: [AuthGuard, AuthService]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    service = new AuthService();
    guard = new AuthGuard(router, service);
    router.initialNavigation();
  });

  it('should check is user Logged in in guard?', () => {
    service.login(true);

    const loggedIn = guard.canActivate(null, null);

    expect(loggedIn).toBeTruthy();
  });

  it('should check is user Logged in in guard?', () => {
    service.login(false);

    const loggedIn = guard.canActivate(null, null);

    expect(loggedIn).toBeFalsy();
  });
});
