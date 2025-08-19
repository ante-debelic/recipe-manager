const mongoose = require("mongoose");

const { Schema } = mongoose;

const ingredientSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit: {
    type: String,
    required: true,
  },
});

module.exports = ingredientSchema;
