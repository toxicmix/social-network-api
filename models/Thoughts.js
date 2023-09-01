const mongoose = require('mongoose');

const ThoughtsSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
  username: { type: String, required: true, unique: true, trim: true}
  
});

const Thoughts = mongoose.model('Thoughts', ThoughtsSchema);

Thoughts.find({})
  .exec()
  .then(async collection => {
    if (collection.length === 0) {
      const results = await Thoughts.insertMany(
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

module.exports = Thoughts;