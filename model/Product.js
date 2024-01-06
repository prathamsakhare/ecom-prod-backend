const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, min: [1, "Wrong Minimum Price!"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "Wrong Minimum Discount Percentage!"],
    max: [99, "Wrong Maximum Discount Percentage!"],
    required: true,
  },
  rating: {
    type: Number,
    min: [0, "Please Give rating more than or equal to zero!"],
    max: [5, "Please Give rating less than or equal to five!"],
    required: true,
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "The Stock Should be more than or equal to zero!"],
    required: true,
    default: 0,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, required: true, default: false },
});


//! this piece of code is written to remove that '_' before '_id' in database, so when we are working with frontend, we don't have to write '_id' instead we can write 'id' only

const virtual = productSchema.virtual("id");
virtual.get(function () {
    return this._id
});
productSchema.set("toJSON", { virtuals: true, versionKey: false, transform: function (doc, ret) { delete ret._id }  });


exports.Product = mongoose.model("Product", productSchema);
