const mongoose = require("mongoose");

const plm = require('passport-local-mongoose')
// const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect("mongodb://127.0.0.1:27017/ums");

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
  password: { type: String },
});


userSchema.plugin(plm);
// userSchema.plugin(mongoosePaginate);





module.exports = mongoose.model("user", userSchema);
