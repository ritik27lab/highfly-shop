const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 7000;

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
  },
});

const upload = multer({ storage: storage });

// Handle POST request for image upload
app.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).json({ message: "Image uploaded successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
