const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
  name: {
    type: "string",
    // required: true,
    // minLength: 3,
  },
  email: {
    type: "string",
    // required: true,
    // unique: [true, "Email is alreay present"],
    // validate(value) {
    //   if (validator.isEmail(value)) {
    //     throw new Error("Failed to validate");
    //   }
    // },
  },
  phoneNumber: {
    type: Number,
    // min: 10,
    // max: 10,
    // required: true,
    // unique: true,
  },
  address: {
    type: String,
    // required: true,
  },
  
  // image: {
  //   type: String,
  // },
  // activationId:{
  //   type: String,
  // }
  componentId:{
    type: Number,
  },
  sectionId: {
     type: Number,  }
});

const User = new mongoose.model("User", usersSchema);

module.exports = User;
