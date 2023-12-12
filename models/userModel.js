//not in use

const mongoose = require("mongoose");

const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://localhost:27017/ums");



const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  qualification: {
    type: String,
    enum: ["10th", "12th", "Graduation"],
    required: true,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


userSchema.plugin(plm);



module.exports = mongoose.model("user", userSchema);
