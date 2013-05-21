var express = require('express'),
    mongoose = require('mongoose')
    mongoStore = require('connect-mongodb');

var app = express();
var mongourl = 'mongodb://localhost/problem_users';
var port = 9001;

console.log('Connecting to MongoDB...');
mongoose.connect(mongourl);

Schema = mongoose.Schema;

attributes = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: String,
  phone: {
    type: String,
    required: true
  },
};

schema = new Schema(attributes, {
  strict: true
});

var User = mongoose.model('User', schema);

app.configure(function() {
  
  //app.use(express.methodOverride());
  //app.use('/static', express.static(__dirname + '/static'));
  app.use(express.cookieParser());

  app.use(express.session({
    secret: 'What bad can happen if I share this secret?',
    maxAge: new Date(Date.now() + 60*60*1000),
    store: new mongoStore({
      db: mongoose.connection.db
    }, function(err) {
      return console.log(err || 'connect-mongodb setup ok');
    })
  }));
  
  return app;
  //return app.use(app.router);
});

app.get('/', function(req, res) {
  console.log('ready to register a new user...');

  var user = {
    firstName: 'Some Name',
    lastName: 'Some Surname',
    email: 'some.email@example.com',
    address: 'Earth',
    phone: 'no phone'
  }

  console.log('calling user create...');
  User.create(user, function(err, doc) {

    console.log('WHY IS THIS MESSAGE NOT PRINTED AT ALL?');
    var done = process.stdout.write('Are we stuck at flushing?');
    if (!done) { // Is stdout blocked?
      process.stdout.on('drain', _)
    }

    /* Form a normal result.

    if(!err) {
      console.log('Everything is fine, get the response.');
      res.json({
        result:'ok',
        lost: doc
      });
      console.log('Good luck!');
    } else {
      console.log('Error occured.');
      res.json({
        result:'error',
        error: err
      });
    }
    */

  });
  console.log('RESPONSE IS OVER. THIS MESSAGE IS PRINTED AT THE END AND WE HANG AFTERWARDS.');
});

app.listen(port);

console.log("Listening on port ", port);

console.log("MongoDB url ", mongourl);

console.log('Navigate your browser to http://localhost:%d', port);
