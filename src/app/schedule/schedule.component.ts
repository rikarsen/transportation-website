import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './schedule.service';
import { FileUploader } from 'ng2-file-upload';
import { Schedule } from './schedule';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ScheduleEditComponent } from './modals/schedule-edit/schedule-edit.component';
import { Subscription } from 'rxjs/Subscription';

const URL = 'http://localhost:8000/schedule/import/';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  private scheduleEditModalSubscription: Subscription;

  public showImport: boolean;
  public uploadBtnActive: boolean;

  public schedule: Schedule[] = [];

  public scheduleRows: Schedule[] = [];
  public scheduleColumns: { prop: string, name: string, headerClass: string, width: string }[] = [
    {prop: 'operator', name: 'Operator', headerClass: '', width: '110'},
    {prop: 'client_name', name: 'Client Name', headerClass: '', width: '160'},
    {prop: 'phone', name: 'Phone', headerClass: '', width: '120'},
    {prop: 'date', name: 'Date', headerClass: '', width: '100'},
    {prop: 'p_u_time', name: 'P/U\nTime', headerClass: 'no-padding', width: '70'},
    {prop: 'appt_time', name: 'Appt.\nTime', headerClass: 'no-padding', width: '70'},
    {prop: 'p_u_address_entrance', name: 'P/U Address/Entrance', headerClass: '', width: '210'},
    {prop: 'p_u_city', name: 'P/U\nCity', headerClass: 'no-padding', width: '160'},
    {prop: 'drop_off_address_entrance', name: 'Drop-off\nAddress/Entrance', headerClass: 'no-padding', width: '200'},
    {prop: 'drop_off_city', name: 'Drop-off\nCity', headerClass: 'no-padding', width: '170'},
    {prop: 'miles', name: 'Miles', headerClass: '', width: '70'},
    {prop: 'trip_type', name: 'Trip\nType', headerClass: 'no-padding', width: '130'},
    {prop: 'veh_type', name: 'Veh.\nType', headerClass: 'no-padding', width: '70'},
    {prop: 'standing_order_id', name: 'Standing\nOrder ID', headerClass: 'no-padding', width: '100'},
    {prop: 'escort_count', name: 'Escort\nCount', headerClass: 'no-padding', width: '90'},
    {prop: 'trip_num', name: 'Trip Num', headerClass: '', width: '100'},
    {prop: 'shared_group', name: 'Shared\nGroup', headerClass: 'no-padding', width: '90'},
    {prop: 'trip_direction', name: 'Trip\nDirection', headerClass: 'no-padding', width: '110'},
    {prop: 'one_way', name: 'One Way', headerClass: '', width: '110'},
    {prop: 'comments', name: 'Comments', headerClass: '', width: '110'},
    {prop: 'travel_time', name: 'Travel\nTime', headerClass: 'no-padding', width: '80'},
    {prop: 'p_u_lat', name: 'P/U Lat.', headerClass: '', width: '80'},
    {prop: 'p_u_long', name: 'P/U Long.', headerClass: '', width: '100'},
    {prop: 'drop_off_lat', name: 'Drop-off Lat.', headerClass: '', width: '130'},
    {prop: 'drop_off_long', name: 'Drop-off Long.', headerClass: '', width: '150'},
  ];

  public uploader: FileUploader;

  public bsModalRef: BsModalRef;

  constructor (private modalService: BsModalService,
               private scheduleService: ScheduleService) {
    this.showImport = false;
    this.uploadBtnActive = false;

    this.getSchedule();

    this.uploader = new FileUploader({
      url: URL,
      allowedMimeType: ['text/csv'],
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.response
      .subscribe(() => {
        this.getSchedule();
      });
  }

  ngOnInit () {
  }

  getSchedule () {
    this.scheduleService.getSchedule()
      .subscribe(res => {
        this.schedule = res.schedule;

        const scheduleRows = [];

        res.schedule.map(row => {
          scheduleRows.push(new Schedule(row));
        });

        this.scheduleRows = [...scheduleRows];

        this.showImport = false;
      });
  }

  toggleImport () {
    this.showImport = !this.showImport;
  }

  uploadFileHover (hover) {
    this.uploadBtnActive = hover;
  }

  openEditRecord (recordId: string) {
    const record = this.schedule.filter(row => row._id === recordId)[0];

    this.bsModalRef = this.modalService.show(ScheduleEditComponent, {
      initialState: {record}
    });

    this.scheduleEditModalSubscription = this.modalService.onHidden
      .subscribe(() => {
        this.getSchedule();

        this.scheduleEditModalSubscription.unsubscribe();
      });
  }
}
