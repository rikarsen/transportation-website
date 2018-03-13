const User = require('../models/User'),
  jwt = require('jsonwebtoken'),
  config = require('../config/DB');

module.exports = (router) => {
  router.post('/register', (req, res) => {
    if (!req.body.email) {
      res.json({success: false, message: 'You must provide an e-mail'});
    } else {
      if (!req.body.email) {
        res.json({success: false, message: 'You must provide a email'});
      } else {
        if (!req.body.password) {
          res.json({success: false, message: 'You must provide a password'});
        } else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            password: req.body.password
          });

          user.save((err) => {
            if (err) {
              if (err.code === 11000) {
                res.json({success: false, message: 'Username or e-mail already exists'});
              } else {
                if (err.errors) {
                  if (err.errors.email) {
                    res.json({success: false, message: err.errors.email.message});
                  } else {
                    if (err.errors.email) {
                      res.json({success: false, message: err.errors.email.message});
                    } else {
                      if (err.errors.password) {
                        res.json({success: false, message: err.errors.password.message});
                      } else {
                        res.json({success: false, message: err});
                      }
                    }
                  }
                } else {
                  res.json({success: false, message: 'Could not save user. Error: ', err});
                }
              }
            } else {
              res.json({success: true, message: 'Account registered!'});
            }
          });
        }
      }
    }
  });

  router.post('/login', (req, res) => {
    if (!req.body.email) {
      res.json({success: false, message: 'No email was provided'});
    } else {
      if (!req.body.password) {
        res.json({success: false, message: 'No password was provided.'});
      } else {
        User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
          if (err) {
            res.json({success: false, message: err});
          } else {
            if (!user) {
              res.json({success: false, message: 'Email not found.'});
            } else {
              const validPassword = user.comparePassword(req.body.password);
              if (!validPassword) {
                res.json({success: false, message: 'Password invalid'});
              } else {
                const token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '24h'});
                res.json({
                  success: true,
                  message: 'Success!',
                  token: token,
                  user: {
                    email: user.email
                  }
                });
              }
            }
          }
        });
      }
    }
  });

  return router;
};
