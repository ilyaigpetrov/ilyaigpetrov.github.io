var mongoose = require('mongoose')
    mongoStore = require('connect-mongodb');

var mongourl = 'mongodb://localhost/problem_users';

console.log("MongoDB: url ", mongourl);
console.log('MongoDB: connecting...');

/*
// THE WRONG WAY OF USING mongoose WITH connect-mongodb.
// The source below was the source of the problem.

mongoose.connect(mongourl, function(err) {
  console.log('THIS IS NOT PRINTED.');
  if (err) {
    console.log('THIS IS NOT PRINTED EITHER.');
    throw err;
  }
});

new mongoStore({
  db: mongoose.connection.db
}, function(err) {
  // The line below usually prints 2.
  console.log('MongoDB: readyState %d (2 = connecting, 1 = connected)', mongoose.connection.readyState);
  return console.log(err || 'connect-mongodb setup ok');
})
*/

// THE RIGHT WAY OF USING mongoose WITH connect-mongodb.
mongoose.connect(mongourl, {auto_reconnect: true, native_parser: true}, function(err) {
  new mongoStore({
    db: mongoose.connection.db
  }, function(err) {
    // The line below usuall prints 1.
    console.log('MongoDB: readyState %d (2 = connecting, 1 = connected)', mongoose.connection.readyState);
    return console.log(err || 'connect-mongodb setup ok');
  });
});

console.log('MongoDB: connected.')

Schema = mongoose.Schema;

attributes = {
  email: {
    type: String,
    required: true,
    unique: true
  }
};

var schema = new Schema(attributes);

var User = mongoose.model('User', schema);

function createUser(callback) {

  var userPropertiesDict = {
    email: 'some.email@example.com',
  }

  console.log('Calling User.create...');
  User.create(userPropertiesDict, callback);
}

function NEVER_CALLED_CALLBACK(err, doc) {

    console.log('WHY IS THIS MESSAGE NOT PRINTED AT ALL?');
    var done = process.stdout.write('Are we stuck at flushing?');
    if (!done) { // Is stdout blocked?
      process.stdout.on('drain', _)
    }
}

createUser(NEVER_CALLED_CALLBACK); // This either creates new User or logs an error that it already exists.
