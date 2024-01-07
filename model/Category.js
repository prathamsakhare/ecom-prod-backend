const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

//! this piece of code is written to remove that '_' before '_id' in database, so when we are working with frontend, we don't have to write '_id' instead we can write 'id' only

const virtual = categorySchema.virtual("id");
virtual.get(function () {
  return this._id;
});
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Category = mongoose.model("Category", categorySchema);
