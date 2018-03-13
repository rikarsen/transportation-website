const express = require('express'),
  app = express(),
  router = express.Router(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path'),
  config = require('./config/DB');

const authentication = require('./routes/authentication')(router);
const schedule = require('./routes/schedule')(router);

const port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to ' + config.db); // Return success message
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authentication', authentication);
app.use('/schedule', schedule);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
