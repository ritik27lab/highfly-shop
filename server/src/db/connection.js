const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/user-registrations", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch(() => {
    console.log("Couldn't connect");
  });
