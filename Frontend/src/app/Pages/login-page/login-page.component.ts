import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'pv-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router, private authService: AuthService) { }

  public login(email, password) {
    this.authService.login(email, password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
