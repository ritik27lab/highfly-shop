const mongoose = require("mongoose");
const validator = require("validator");

const ImageDetailsScehma = new mongoose.Schema(
  {
    image: String,
  }
  //   {
  //     collection: "ImageDetails",
  //   }
);

mongoose.model("ImageDetails", ImageDetailsScehma);

const Image = mongoose.model("ImageDetails");

module.exports = Image;
