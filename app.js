const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const nameModel = require("./database");
const app = express();
const port = 5050 || process.env.PORT;
app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Working");
});
console.log("app");
app.post("/authenticate", async (req, res) => {
  let checkUser, checkpass;
  console.log(req.body.name);
  if (req.body.name === "" && req.body.password === "") {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid Inputs",
    });
  }
  if (req.body.name != "" && req.body.password === "") {
    console.log(req.body.name + "name");
    checkUser = await nameModel.findOne({ username: req.body.name });
    console.log(checkUser);
    if (checkUser) {
      return res.status(200).json({
        status: "success1",
        message: "user alreay exists can login",
        data: checkUser,
      });
    } else if (checkUser === null) {
      return res.status(404).json({
        status: "Failed1",
        message: "Invalid Inputs",
      });
    }
  }

  if (req.body.name != "" && req.body.password != "") {
    checkUser = await nameModel.findOne({ username: req.body.name });
    checkpass = await nameModel.findOne({ password: req.body.password });
    if (checkUser && !checkpass) {
      const addUser = new nameModel({
        username: req.body.name,
        password: req.body.password,
      });
      const savedUser = addUser.save();
      return res.status(200).json({
        status: "success2",
        message: "sameNameDiffPassword",
        data: savedUser,
      });
    }
  }
  if (req.body.name != "" && req.body.password != "") {
    checkUser = await nameModel.findOne({ username: req.body.name });
    if (checkUser) {
      console.log(checkUser);
      return res.status(200).json({
        status: "Success3",
        message: "User already exists",
        data: checkUser,
      });
    }
  }
  const addUser = new nameModel({
    username: req.body.name,
    password: req.body.password,
  });
  const savedUser = await addUser.save();
  console.log(savedUser);
  res.status(200).json({
    status: "success4",
    message: "added new user",
    data: savedUser,
  });
});
app.listen(port, () => {
  console.log("listening at 5050");
});
