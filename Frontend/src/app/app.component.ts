import { Component } from '@angular/core';

@Component({
  selector: 'pv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean = false;

  constructor() { }
}
