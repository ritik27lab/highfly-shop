// const express = require("express");
// const cors = require("cors"); // Import the cors middleware
// const multer = require("multer");
// const path = require("path");
// const User = require("./models/users");

// var app = express();

// app.use(express.json());

// // app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// const upload = multer({
//   storage: storage,
// });

// app.post("/user", (req, res) => {
//   console.log("USER DATA", req.body);
//   const user = new User(req.body);
//   user
//     .save()
//     .then(() => {
//       res.send(user);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// // Create a new user
// app.post("/user", upload.single("file"), (req, res) => {
//   console.log("USER DATA", req.body);
//   console.log("SERVER DATA", req.file);

//   const user = new User(req.body);
//   user
//     .save()
//     .then(() => {
//       res.send(user);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/Images");
//   },
//   filename: (req, file, cb) => {
//     cd(
//       null,
//       file.fieldname + "_" + Date.now() + path.extName(file.originalname)
//     );
//   },
// });

// // app.post("upload", upload.single("file"), (req, res) => {
// //   // console.log("SERVER DATA", req.file);
// //   // User.create(image: req.file)
// // });

// // app.put("/user/:id", (req, res) => {
// //   const userId = req.params.id;
// //   const userData = req.body; // Updated user data

// //   // Assuming you have a User model with a findByIdAndUpdate function
// //   User.({}) // { new: true } returns the updated document
// //     .then((updatedUser) => {
// //       console.log("USER--DOOOM-->", updatedUser, userData);
// //       if (!updatedUser) {
// //         return res.status(404).send("User not found");
// //       }
// //       res.json(updatedUser);
// //     })
// //     .catch((err) => {
// //       res.status(500).send("Error updating user");
// //     });
// // });

// app.listen(PORT, () => {
//   console.log("Listening on port at-->", PORT);
// });

const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors"); // Import the cors middleware
const multer = require("multer");
const path = require("path");
const User = require("./models/users");
const Image = require("./models/image");

app.use(express.static(path.join(__dirname, "upload")));

const fs = require("fs");

// Middleware for parsing JSON requests
app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: "./src/uploads/", // Where to store uploaded files
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Handle image upload
// app.post("/user", upload.single("image"), async (req, res) => {
//   // try {
//   //   if (!req.file) {
//   //     return res.status(400).send("No files were uploaded.");
//   //   }

//   // const { filename, path } = req.file;

//   // You can save the image metadata to MongoDB here if needed

//   const userData = {
//     name: req.body.name,
//     email: req.body.email,
//     phoneNumber: req.body.phoneNumber,
//     address: req.body.address,
//     image: "filename", // Store the image filename in the user data
//   };

//   const user = new User(userData);

//   await user.save();
//   return res.json({ message: "User created successfully", user });
//   // } catch (error) {
//   //   console.error(error);
//   //   return res.status(500).json({ error: "Server error" });
//   // }
// });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await Image.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

// public images
app.get("/public/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "./src/public", filename);

  // Check if the image file exists in the public directory
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

// Define your API routes here, for example:
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the Express server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Listening on port at-->", PORT);
});
