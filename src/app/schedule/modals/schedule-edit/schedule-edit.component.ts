import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Schedule } from '../../schedule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../../schedule.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {
  record: Schedule;

  form: FormGroup;

  constructor (public bsModalRef: BsModalRef,
               private formBuilder: FormBuilder,
               private scheduleService: ScheduleService) {
  }

  ngOnInit () {
    this.createForm();
  }

  createForm () {
    this.form = this.formBuilder.group({
      operator: [this.record.operator, Validators.required],
      client_name: [this.record.client_name, Validators.required],
      phone: [this.record.phone, Validators.required],
      date: [this.record.date, Validators.required],
      p_u_time: [this.record.p_u_time, Validators.required],
      appt_time: [this.record.appt_time, Validators.required],
      p_u_address_entrance: [this.record.p_u_address_entrance, Validators.required],
      p_u_city: [this.record.p_u_city, Validators.required],
      drop_off_address_entrance: [this.record.drop_off_address_entrance, Validators.required],
      drop_off_city: [this.record.drop_off_city, Validators.required],
      miles: [this.record.miles, Validators.required],
      fare: [this.record.fare, Validators.required],
      trip_type: [this.record.trip_type, Validators.required],
      veh_type: [this.record.veh_type, Validators.required],
      standing_order_id: [this.record.standing_order_id, Validators.required],
      escort_count: [this.record.escort_count, Validators.required],
      trip_num: [this.record.trip_num, Validators.required],
      shared_group: [this.record.shared_group, Validators.required],
      trip_direction: [this.record.trip_direction, Validators.required],
      one_way: [this.record.one_way, Validators.required],
      comments: [this.record.comments, Validators.required],
      travel_time: [this.record.travel_time, Validators.required],
      p_u_lat: [this.record.p_u_lat, Validators.required],
      p_u_long: [this.record.p_u_long, Validators.required],
      drop_off_lat: [this.record.drop_off_lat, Validators.required],
      drop_off_long: [this.record.drop_off_long, Validators.required]
    });
  }

  saveForm () {
    this.bsModalRef.hide();

    const record = {
      _id: this.record._id,
      operator: this.form.get('operator').value,
      client_name: this.form.get('client_name').value,
      phone: this.form.get('phone').value,
      date: this.form.get('date').value,
      p_u_time: this.form.get('p_u_time').value,
      appt_time: this.form.get('appt_time').value,
      p_u_address_entrance: this.form.get('p_u_address_entrance').value,
      p_u_city: this.form.get('p_u_city').value,
      drop_off_address_entrance: this.form.get('drop_off_address_entrance').value,
      drop_off_city: this.form.get('drop_off_city').value,
      miles: this.form.get('miles').value,
      fare: this.form.get('fare').value,
      trip_type: this.form.get('trip_type').value,
      veh_type: this.form.get('veh_type').value,
      standing_order_id: this.form.get('standing_order_id').value,
      escort_count: this.form.get('escort_count').value,
      trip_num: this.form.get('trip_num').value,
      shared_group: this.form.get('shared_group').value,
      trip_direction: this.form.get('trip_direction').value,
      one_way: this.form.get('one_way').value,
      comments: this.form.get('comments').value,
      travel_time: this.form.get('travel_time').value,
      p_u_lat: this.form.get('p_u_lat').value,
      p_u_long: this.form.get('p_u_long').value,
      drop_off_lat: this.form.get('drop_off_lat').value,
      drop_off_long: this.form.get('drop_off_long').value
    };

    this.scheduleService.saveSchedule(record)
      .subscribe((res: any) => {
        if (!res.success) {
          
        }
      });
  }
}
