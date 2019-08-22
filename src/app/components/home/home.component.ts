import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authorization/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: string = null;
  lastName: string = null;
  email: string = null;
  constructor(private service: AuthService, private router: Router) {
    if (service.user) {
      this.name = service.user.name;
      this.lastName = service.user.lastName;
      this.email = service.user.email;
    }

  }

  ngOnInit() {}
  
  logOut() {
    this.service.user = null;
    this.router.navigate(['login']);
  }

}
