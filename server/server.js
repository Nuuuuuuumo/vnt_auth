//IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/AuthRoute");
const cors = require("cors");

//Application
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);

const start = async () => {
  try {
      await mongoose.connect("mongodb+srv://Deymoss:Deymoss228@cluster0.run5kue.mongodb.net/?retryWrites=true&w=majority");

    app.listen(PORT, (req, res) => {
      console.log(`Server has been started on PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
  