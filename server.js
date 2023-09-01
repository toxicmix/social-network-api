const express = require('express');
const db = require('./config/connection');
// Require model
const { User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates a new department
app.post('/users', async (req, res) => {
  const newUser = await User.create(req.body);
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds all users
app.get('/users', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds the first matching document
app.get('/users/:username', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await User.findOne({ username: req.params.username });
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds first document matching parameter and deletes
// For demo, use 'Wine' as URL param
app.delete('/users/:username', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ username: req.params.username });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
