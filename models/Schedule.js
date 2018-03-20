const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const scheduleSchema = new Schema({
  operator: {type: String},
  client_name: {type: String},
  phone: {type: String},
  date: {type: String},
  p_u_time: {type: String},
  appt_time: {type: String},
  p_u_address_entrance: {type: String},
  p_u_city: {type: String},
  drop_off_address_entrance: {type: String},
  drop_off_city: {type: String},
  miles: {type: Number},
  fare: {type: Number},
  trip_type: {type: String},
  veh_type: {type: String},
  standing_order_id: {type: String, index: {unique: true}},
  escort_count: {type: String},
  trip_num: {type: String},
  shared_group: {type: String},
  trip_direction: {type: String},
  one_way: {type: String},
  comments: {type: String},
  travel_time: {type: Number},
  p_u_lat: {type: Number},
  p_u_long: {type: Number},
  drop_off_lat: {type: Number},
  drop_off_long: {type: Number}
});

module.exports = mongoose.model('Schedule', scheduleSchema);
