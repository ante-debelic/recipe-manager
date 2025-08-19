const mongoose = require("mongoose");
const ingredientSchema = require("./ingredients.js");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "",
  },

  servings: {
    type: Number,
    required: true,
    min: 1,
  },
  cookingTime: {
    type: Number,
    required: true,
    min: 1,
  },
  ingredients: [ingredientSchema],
  tags: {
    type: [String],
    default: [],
    enum: [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Dessert",
      "Salad",
      "Vegetarian",
      "Sugar free",
    ],
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
