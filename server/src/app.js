const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors"); // Import the cors middleware
const multer = require("multer");
const path = require("path");
const User = require("./models/users");
const Image = require("./models/image");
const STRIPE_SECRET_KEY = 'sk_test_51Nxqw1SJTM7D4Hto4E7eShhBdJrvisaYb65hI0vXRi345Lar0jEfhv1q9gn8AV9PvJV6Tuo28iJYq4bkCxuGcLmt0005GgqY3g';
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const { signIn } = require("./userlogin/userLogin");
const { signUp } = require("./userlogin/userLogin");

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

app.post("/signUp", signUp);
app.post("/signIn", signIn);

const upload = multer({ storage });



// **********************************
app.post("/pay", async (req, res) => {
  try {
    const amount = 2000; // lowest denomination
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      metadata: {
        name: "value",
      },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ clientSecret, message: "Payment Initiated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/stripe", (req, res) => {
  if (req.body.type === "payment_intent.created") {
    console.log(`${req.body.data.object.metadata.name} initated payment!`);
  }
  if (req.body.type === "payment_intent.succeeded") {
    console.log(`${req.body.data.object.metadata.name} succeeded payment!`);
  }
});





// Handle image upload
app.post("/createUser", async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already taken" });
    }

    // Create the userData object
    const userData = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      componentId: req.body.componentId,
      sectionId:req.body.sectionId
      // You can include image handling code here if needed
    };

    const user = new User(userData);

    await user.save();
    return res.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

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

app.delete("/api/users/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send;
    }
    res.send(deleteUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.findById(_id);
    console.log(userData);
    if (!userData) {
      return res.status(404).send();
    } else {
      res.send(userData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//update the students by id
app.patch("/api/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUserData = await User.findByIdAndUpdate(_id, req.body);
    res.send(updateUserData);
  } catch (e) {
    res.status(404).send(updateUserData);
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
  //working get API request
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//login and sign up api with token

// Start the Express server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Listening on port at-->", PORT);
});
