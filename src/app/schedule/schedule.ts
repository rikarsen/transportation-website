import * as moment from 'moment';

export class Schedule {
  _id: string;
  operator: string;
  client_name: string;
  phone: string;
  date: string;
  p_u_time: string;
  appt_time: string;
  p_u_address_entrance: string;
  p_u_city: string;
  drop_off_address_entrance: string;
  drop_off_city: string;
  miles: Number;
  fare: Number;
  trip_type: string;
  veh_type: string;
  standing_order_id: string;
  escort_count: string;
  trip_num: string;
  shared_group: string;
  trip_direction: string;
  one_way: string;
  comments: string;
  travel_time: Number;
  p_u_lat: Number;
  p_u_long: Number;
  drop_off_lat: Number;
  drop_off_long: Number;

  constructor (schedule?) {
    schedule = schedule || {};

    this._id = schedule._id || null;
    this.operator = schedule.operator || '';
    this.client_name = schedule.client_name || '';
    this.phone = Schedule.formatPhone(schedule.phone);
    this.date = schedule.date || null;
    this.p_u_time = Schedule.formatTime(schedule.p_u_time);
    this.appt_time = Schedule.formatTime(schedule.appt_time);
    this.p_u_address_entrance = Schedule.formatAddress(schedule.p_u_address_entrance);
    this.p_u_city = schedule.p_u_city || '';
    this.drop_off_address_entrance = Schedule.formatAddress(schedule.drop_off_address_entrance);
    this.drop_off_city = schedule.drop_off_city || '';
    this.miles = schedule.miles || null;
    this.fare = schedule.fare || null;
    this.trip_type = schedule.trip_type || '';
    this.veh_type = schedule.veh_type || '';
    this.standing_order_id = schedule.standing_order_id || '';
    this.escort_count = schedule.escort_count || '';
    this.trip_num = schedule.trip_num || '';
    this.shared_group = schedule.shared_group || '';
    this.trip_direction = schedule.trip_direction || '';
    this.one_way = schedule.one_way || '';
    this.comments = schedule.comments || '';
    this.travel_time = schedule.travel_time || null;
    this.p_u_lat = schedule.p_u_lat || null;
    this.p_u_long = schedule.p_u_long || null;
    this.drop_off_lat = schedule.drop_off_lat || null;
    this.drop_off_long = schedule.drop_off_long || null;
  }

  static formatTime (time) {
    if (!time) {
      return '';
    }

    let hour, minute;

    hour = time.substring(0, 2);
    minute = time.substring(2, 4);

    if (time.substring(4, 5) === 'P') {
      hour = (+hour + 12).toString();
    }

    return moment(`${ hour }:${ minute }`, 'HH:mm').format('HH:mm');
  }

  static formatAddress (address) {
    if (!address) {
      return '';
    }

    return address.replace(/,\s?/g, '').slice(0, -5);
  }

  static formatPhone (phone) {
    if (!phone.trim()) {
      return '';
    }

    return phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6, 4);
  }
}
