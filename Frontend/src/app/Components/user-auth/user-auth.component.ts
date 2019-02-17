import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'pv-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})

export class UserAuthComponent implements OnInit {
  @Output() loggedOut: EventEmitter<void> = new EventEmitter<void>();
  public userEmail: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getEmail();
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      this.loggedOut.emit();
      this.userEmail = null;
    })
  }

  private getEmail() {
    this.authService.getEmail().subscribe((email) => {
      this.userEmail = email;
    });
  }
}