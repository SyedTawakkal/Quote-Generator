const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
console.log("hello");
mongoose
  .connect("mongodb://localhost:27017/quotes", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to the database");
  });

const nameSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  // confirmPassword: {
  //   type: String,
  //   validator: function (el) {
  //     return el === this.password;
  //   },
  //   message: "Passwords are not matching",
  // },
});
nameSchema.pre("save", async function (next) {
  // encrypting-password
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const nameModel = mongoose.model("Deets", nameSchema);
module.exports = nameModel;
