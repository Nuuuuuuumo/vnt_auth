//IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/AuthRoute");
const config = require("config");
const cors = require("cors");

//Application
const app = express();
const PORT = config.get("serverPort");

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, (req, res) => {
      console.log(`Server has been started on PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
