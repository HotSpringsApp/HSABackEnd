require('dotenv').config()
const express = require('express');
const { mongo, default: mongoose } = require('mongoose');
const app = express();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotspringsdb');
    console.log('Connected to MongoDB');
  } catch(e) {
    console.error('MongoDB connection failed');
  }
}
connect();
mongoose.set('strictQuery', true);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/all', (req, res) => {
  
})

app.get('/:country', (req, res) => {
  res.json({sample: 'testing'})
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});