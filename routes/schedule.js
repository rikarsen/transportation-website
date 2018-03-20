const Schedule = require('../models/Schedule'),
  Client = require('../models/Client'),
  ObjectId = require('mongoose').Types.ObjectId,
  multer = require('multer'),
  csv = require('csvtojson'),
  fs = require('fs'),
  config = require('../config/DB');

let upload = multer({
  dest: config.filesDest
});

let deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      let curPath = path + '/' + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
};

module.exports = (router) => {
  router.post('/import', upload.array('file'), (req, res) => {
    const files = req.files;

    files.map(file => {
      const filePath = file.path;

      let dataArray = [],
        scheduleData = [];

      csv()
        .fromFile(filePath)
        .on('json', (jsonObj) => {
          dataArray.push(jsonObj);
        })
        .on('done', (err) => {
          if (err) {
            res.status(400).send({success: false, message: 'Unable to parse file'});
          } else {
            dataArray.map((row, index) => {
              if (index > 1) {
                let rowKeys = Object.keys(row);

                scheduleData.push(new Schedule({
                  operator: row[rowKeys[0]],
                  client_name: row[rowKeys[1]],
                  phone: row[rowKeys[2]],
                  date: row[rowKeys[3]],
                  p_u_time: row[rowKeys[4]],
                  appt_time: row[rowKeys[5]],
                  p_u_address_entrance: row[rowKeys[6]],
                  p_u_city: row[rowKeys[7]],
                  drop_off_address_entrance: row[rowKeys[8]],
                  drop_off_city: row[rowKeys[9]],
                  miles: row[rowKeys[10]],
                  fare: row[rowKeys[11]],
                  trip_type: row[rowKeys[12]],
                  veh_type: row[rowKeys[13]],
                  standing_order_id: row[rowKeys[14]],
                  escort_count: row[rowKeys[15]],
                  trip_num: row[rowKeys[16]],
                  shared_group: row[rowKeys[17]],
                  trip_direction: row[rowKeys[18]],
                  one_way: row[rowKeys[19]],
                  comments: row[rowKeys[20]],
                  travel_time: row[rowKeys[21]],
                  p_u_lat: row[rowKeys[22]],
                  p_u_long: row[rowKeys[23]],
                  drop_off_lat: row[rowKeys[24]],
                  drop_off_long: row[rowKeys[25]]
                }));
              }
            });

            let clientNames = [],
              clients = [];

            scheduleData.map(row => {
              clientNames.push(row.client_name);

              clients.push({
                client_name: row.client_name
              });
            });

            Client.update({
              client_name: {
                $in: clientNames
              }
            }, {
              last_date_driven: new Date(),
              permanent: true
            }, {
              multi: true
            }, err => {
              if (!err) {
                Client.insertMany(clients, {
                  ordered: false
                }, err => {
                  if (err && err.code !== 11000) {
                    console.log(err);
                  } else {
                    Schedule.insertMany(scheduleData, {
                      ordered: false
                    }, err => {
                      if (err && err.code !== 11000) {
                        console.log(err);
                      } else {
                        deleteFolderRecursive('files');

                        res.json({success: true});
                      }
                    });
                  }
                });
              }

              console.log(err);
            });
          }
        });
    })
  });

  router.get('/all', (req, res) => {
    Schedule.find({}, (err, schedule) => {
      if (err) {
        res.json({success: false, message: err});
      } else {
        if (!schedule) {
          res.json({success: false, message: 'No schedule found.'});
        } else {
          res.json({success: true, schedule: schedule});
        }
      }
    });
  });

  router.get('/permanents', (req, res) => {
    Client.find({
      permanent: true
    }, (err, schedule) => {
      if (err) {
        res.json({success: false, message: err});
      } else {
        if (!schedule) {
          res.json({success: false, message: 'No schedule found.'});
        } else {
          res.json({success: true, schedule: schedule});
        }
      }
    });
  });

  router.put('/update', (req, res) => {
    if (!req.body._id) {
      res.json({success: false, message: 'No record id provided'});
    } else {
      Schedule.findOne({_id: ObjectId(req.body._id)}, (err, record) => {
        if (err) {
          res.json({success: false, message: 'Not a valid record id'});
        } else {
          if (!record) {
            res.json({success: false, message: 'Record id was not found.'});
          } else {
            record.operator = req.body.operator;
            record.client_name = req.body.client_name;
            record.phone = req.body.phone;
            record.date = req.body.date;
            record.p_u_time = req.body.p_u_time;
            record.appt_time = req.body.appt_time;
            record.p_u_address_entrance = req.body.p_u_address_entrance;
            record.p_u_city = req.body.p_u_city;
            record.drop_off_address_entrance = req.body.drop_off_address_entrance;
            record.drop_off_city = req.body.drop_off_city;
            record.miles = req.body.miles;
            record.fare = req.body.fare;
            record.trip_type = req.body.trip_type;
            record.veh_type = req.body.veh_type;
            record.standing_order_id = req.body.standing_order_id;
            record.escort_count = req.body.escort_count;
            record.trip_num = req.body.trip_num;
            record.shared_group = req.body.shared_group;
            record.trip_direction = req.body.trip_direction;
            record.one_way = req.body.one_way;
            record.comments = req.body.comments;
            record.travel_time = req.body.travel_time;
            record.p_u_lat = req.body.p_u_lat;
            record.p_u_long = req.body.p_u_long;
            record.drop_off_lat = req.body.drop_off_lat;
            record.drop_off_long = req.body.drop_off_long;

            record.save((err) => {
              if (err) {
                if (err.errors) {
                  res.json({success: false, message: 'Please ensure form is filled out properly'});
                } else {
                  res.json({success: false, message: err});
                }
              } else {
                res.json({success: true, message: 'Record Updated!'});
              }
            });
          }
        }
      });
    }
  });

  return router;
};
