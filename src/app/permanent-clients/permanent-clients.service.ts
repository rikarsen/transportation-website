import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PermanentClientsService {
  private domain = this.authService.domain;

  constructor (private http: HttpClient,
               private authService: AuthenticationService) { }

  getPermanentClients (): Observable<any> {
    return this.http
      .get(`${ this.domain }schedule/permanents`);
  }
}
