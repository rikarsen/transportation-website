const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const clientSchema = new Schema({
  client_name: {type: String, index: {unique: true}},
  last_date_driven: {type: Date, default: new Date()},
  permanent: {type: Boolean, default: false}
});

module.exports = mongoose.model('Client', clientSchema);
