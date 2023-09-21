const express = require("express");
const cors = require("cors"); // Import the cors middleware
const multer = require("multer");
const path = require("path");
const User = require("./models/users");

var app = express();

require("./db/connection");

const PORT = process.env.PORT || 8000;

app.use(express.json());

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const upload = multer({
  storage: storage,
});

// Create a new user
app.post("/user", upload.single("file"), (req, res) => {
  console.log("USER DATA", req.body);
  console.log("SERVER DATA", req.file);

  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cd(
      null,
      file.fieldname + "_" + Date.now() + path.extName(file.originalname)
    );
  },
});

// app.post("upload", upload.single("file"), (req, res) => {
//   // console.log("SERVER DATA", req.file);
//   // User.create(image: req.file)
// });

// app.put("/user/:id", (req, res) => {
//   const userId = req.params.id;
//   const userData = req.body; // Updated user data

//   // Assuming you have a User model with a findByIdAndUpdate function
//   User.({}) // { new: true } returns the updated document
//     .then((updatedUser) => {
//       console.log("USER--DOOOM-->", updatedUser, userData);
//       if (!updatedUser) {
//         return res.status(404).send("User not found");
//       }
//       res.json(updatedUser);
//     })
//     .catch((err) => {
//       res.status(500).send("Error updating user");
//     });
// });

app.listen(PORT, () => {
  console.log("Listening on port at-->", PORT);
});
