import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'pv-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private router: Router, private authService: AuthService) { }

  register(email, password) {
    this.authService.register(email, password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
