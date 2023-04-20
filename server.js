const express = require("express");
const { mongo, default: mongoose } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// setting up express
const app = express();
const HotSprings = require("./models/hotSprings");
app.use(cors());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

// setting up mongoose
async function connect() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/hotspringsdb"
    );
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("MongoDB connection failed");
  }
}
connect();
mongoose.set("strictQuery", true);

// setting up routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/all", async (req, res) => {
  const hotsprings = await HotSprings.find();
  res.json(hotsprings);
});

app.get("/:country", (req, res) => {
  res.json({ sample: "testing" });            // To be implemented - hostprings in a country - i.e. 'hotsprings.in/Spain'
});

// user routes
app.use("/", require('./routes/userRouter'));
