import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class ScheduleService {
  private requestOptions: any;
  private domain = this.authService.domain;

  constructor (private http: HttpClient,
               private authService: AuthenticationService) { }

  getSchedule (): Observable<any> {
    return this.http
      .get(`${ this.domain }schedule/all`);
  }

  saveSchedule (record: any) {
    return this.http
      .put(`${ this.domain }schedule/update`, record, this.requestOptions);
  }
}
