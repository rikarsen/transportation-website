import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from './user';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  public domain = environment.domain;

  public user: User;
  public token: string;

  constructor (private http: HttpClient,
               private router: Router) { }

  loadToken () {
    this.token = localStorage.getItem('token');
  }

  login (user) {
    return this.http
      .post(`${ this.domain }authentication/login`, user);
  }

  logout () {
    this.token = null;
    this.user = null;

    localStorage.clear();

    this.router.navigate(['/authentication']);
  }

  storeUserData (token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  loggedIn () {
    return tokenNotExpired();
  }
}
