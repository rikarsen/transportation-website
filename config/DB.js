const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  filesDest: './files/',
  uri: 'mongodb://rikarsen:rikarsen6951600@ds247698.mlab.com:47698/transportationwebsite',
  secret: crypto,
  db: 'development database: Transportation Website'
};
