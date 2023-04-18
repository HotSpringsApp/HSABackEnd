const mongoose = require('mongoose');

const HotSpringsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  address: {
    type: String
  },
  country: {
    type: String,
    unique: true
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  lat: {
    type: String,
    unique: true
  },
  long: {
    type: String,
    unique: true
  },
  public: {
    type: Boolean
  },
  hotel: {
    type: Boolean
  },
  description: {
    type: String
  },
  setting: {
    type: String
  },
  temperatureMin: {
    type: Number
  },
  temperatureMax: {
    type: Number
  },
  createdAt: {
    type: Date,default: () => Date.now()
  },
  updatedAt: {
    type: Date, default: () => Date.now()
  }
})

module.exports= mongoose.model('hotsprings', HotSpringsSchema);
