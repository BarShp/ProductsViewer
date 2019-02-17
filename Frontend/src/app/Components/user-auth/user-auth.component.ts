import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'pv-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})

export class UserAuthComponent implements OnInit {
  private isLoggedIn: boolean = false;

  @Output() isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public userEmail: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((res) => {
      if (res) {
        this.isLoggedIn = res;
        this.isLoggedInChange.emit(this.isLoggedIn);
        this.getEmail();
      }
    }, (error) => {
      console.log('error', error);
    });
  }

  public login(email, password) {
    this.authService.login(email, password).subscribe(() => {
      this.isLoggedIn = true;
      this.isLoggedInChange.emit(this.isLoggedIn);
      this.getEmail();
    });
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.isLoggedInChange.emit(this.isLoggedIn);
      this.userEmail = null;
    })
  }

  private getEmail() {
    this.authService.getEmail().subscribe((email) => {
      this.userEmail = email;
    });
  }
}