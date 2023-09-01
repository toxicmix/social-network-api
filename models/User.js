const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true},
  email: { type: String, required: true, unique: true
  //   , 
  //   validate: {
  //   validator: function(v) {
  //     return `^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$`.test(v);
  //   },
  //   message: props => `${props.value} is not a valid email!`
  // },
},
});

const User = mongoose.model('User', UserSchema);

User.find({})
  .exec()
  .then(async collection => {
    if (collection.length === 0) {
      const results = await User.insertMany(
        [
          { username: 'Produce' , email: "test@test.com"},
          { username: 'milk' , email: "milkmanmike@test.com"}
        ]
      );
      return console.log('Departments inserted', results);
    }
    return console.log('Already populated');
  })
  .catch(err => handleError(err));


const handleError = (err) => console.error(err);

module.exports = User;