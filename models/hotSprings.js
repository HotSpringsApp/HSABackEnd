const mongoose = require("mongoose");
const HotSpringsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  properties: {
    type: {
      type: String,
      enum: ["Feature"],
      required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    properties: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      temperatureMin: {
        type: Number,
        required: true,
      },
      temperatureMax: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      public: {
        type: Boolean,
        required: true,
      },
      hotel: {
        type: Boolean,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      setting: {
        type: String,
        required: true,
      },
      images: {
        type: [
          {
            type: String,
          },
        ],
      },
      createdAt: {
        type: Date,
        default: () => Date.now(),
      },
      updatedAt: {
        type: Date,
        default: () => Date.now(),
      },
    },
  },
});

module.exports = mongoose.model("hotsprings", HotSpringsSchema);
