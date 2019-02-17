import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private LOCAL_STORAGE_TOKEN_KEY: string = 'pv-jwt-token';
  private BASE_URL: string = "http://localhost/auth";

  constructor(private http: HttpClient) { }

  public isLoggedIn(): Observable<any> {
    return this.http.get(this.BASE_URL + '/getUser', { headers: this.authorizationHeader() })
      .map((user) => {
        if (user) {
          return true;
        }
        return false;
      })
      .pipe(catchError((err) => {
        if (err.status == '401') {
          return of(false);
        }
        throw err;
      }));
  }

  public login(email, password) {
    return this.http.post(this.BASE_URL + '/getToken', { email: email, password: password }).map(
      (res: Token) => {
        if (res) {
          localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, res.token);
        }
      }
    );
  }

  public getEmail() {
    return this.http.get(this.BASE_URL + '/getUser', { headers: this.authorizationHeader() }).map(
      (res) => {
        return res["email"];
      }
    )
  }

  public logout() {
    return of(localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY));
  }

  public getToken(): string {
    return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
  }

  public authorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'bearer ' + this.getToken());
  }
}
