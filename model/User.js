const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  //* we have to make separate schema for address, because we have to make an array of addresses
  addresses : {type : [Mixed]},
  name : {type : String, required : true},
  // * we have to make new schema for orders too
  orders : {type : [Mixed]}
});

//! this piece of code is written to remove that '_' before '_id' in database, so when we are working with frontend, we don't have to write '_id' instead we can write 'id' only

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", userSchema);
