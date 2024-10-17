const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const user_data = require("./models/usermodel");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));


app.use(
  session({
    secret: "idsfsiUHIUUBYUYUI64#%$#$%^MNbhBBhbgHBK+56hjhkGghgg+H&%&^b",
    resave: false,
    saveUninitialized: false,
  })
);



app.get("/", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
});

app.post("/", async(req, res)=> {
  try {
    console.log(req.body)
    const isRightUser = await user_data.findOne({email: req.body.email})
    if (isRightUser) {
      req.session.user_id = isRightUser._id;
      res.status(200).redirect('/home')
    } else {
      return;
    }
  } catch (error) {
    console.log(error)
  }
})

app.get("/home", async (req, res) => {
  try {
    const user = await user_data.findById(req.session.user_id);
    res.render("index", {user});
  } catch (error) {
    console.log(error);
  }
});

app.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const registerUser = new user_data({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobilenumber: req.body.mobilenumber,
      dob: req.body.dob,
      age: req.body.age,
      password: req.body.password,
      gender: req.body.gender,
    });

    const registerUserCompleted = await registerUser.save();

    res.status(201).redirect("/")

  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect("mongodb://localhost:27017/SexEd")
  .then(() => {
    console.log("Connection sucssful....");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen("41025", () => {
  console.log("Connected to port 41025");
});
