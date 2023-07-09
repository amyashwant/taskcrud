const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute=require("./routes/add")

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
     console.log(err)
    } else {
    console.log("connected mongodb")
    }
  }
);
app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);

app.listen(5000, () => {
  console.log("backend server is running");
});
