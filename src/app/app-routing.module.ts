import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './authorization/auth.guard';


const routes: Routes = [{
  path: '',  redirectTo: 'login', pathMatch: 'full'
}, {
  path: 'login', component: LoginComponent
}, {
  path: 'registration', component: RegistrationComponent
}, {
  path: 'home', component: HomeComponent, canActivate: [AuthGuard]
}, {
  path: '**', redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
