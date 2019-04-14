import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './Services/auth.service';

@Component({
  selector: 'pv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router)
  {
    this.authService.isLoggedIn().subscribe((loggedIn) =>
    {
      this.isLoggedIn = loggedIn;
      if (!loggedIn)
      {
        this.router.navigate(['/Login']);
      }
    }, (error) =>
    {
      console.log('error', error);
    });
  }

  onLoggedOut()
  {
    this.router.navigate(['/Login']);
  }
}
