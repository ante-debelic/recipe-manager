const Recipe = require("../models/recipe.js");

const ITEMS_PER_PAGE = 6;

exports.getRecipes = async (req, res, next) => {
  const { query, tag } = req.query;

  const page = +req.query.page || 1;
  let totalItems;

  const filter = {};

  if (query) {
    const regex = new RegExp(query, "i");
    filter.$or = [
      { title: regex },
      { source: regex },
      { "ingredients.title": regex },
    ];
  }

  if (tag) {
    filter.tags = tag;
  }

  try {
    totalItems = await Recipe.countDocuments(filter);

    const recipes = await Recipe.find(filter)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    res.status(200).json({
      message: "Successfully fetched data",
      recipes,
      paginationData: {
        totalRecipes: totalItems,
        currentPage: page,
        nextPage: page + 1,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        prevPage: page - 1,
        hasPrevPage: page - 1 !== 0,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Fetching recipes failed.",
      error: err.message,
    });
  }
};

exports.createRecipe = async (req, res, next) => {
  const { title, description, source, instructions, servings, cookingTime } =
    req.body;

  const tags = JSON.parse(req.body.tags);
  const ingredients = JSON.parse(req.body.ingredients);
  const image = req.file ? req.file.path : "";

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ message: "Invalid ingredients format." });
  }

  const areIngredientsValid = ingredients.every(
    (ing) => ing.title && ing.quantity && ing.unit
  );

  if (!areIngredientsValid) {
    return res
      .status(400)
      .json({ message: "Some ingredients are missing fields" });
  }
  try {
    const recipe = new Recipe({
      title: title,
      description: description,
      source: source,
      instructions: instructions,
      image: image,
      servings: servings,
      cookingTime: cookingTime,
      tags: tags,
      ingredients: ingredients,
    });

    const savedRecipe = await recipe.save();
    res.status(201).json({
      message: "Succesfully created recipe",
      data: savedRecipe,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({
      message: "Could not find recipe.",
      error: err.message,
    });
  }
};

exports.deleteRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    await Recipe.findByIdAndDelete(recipeId);
    res.status(200).json({ message: "Recipe deleted successfully.", recipeId });
  } catch (err) {
    res.status(400).json({
      message: "Could not delete recipe.",
      error: err.message,
    });
  }
};

exports.editRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  const {
    title,
    description,
    source,
    instructions,
    servings,
    cookingTime,
    tags,
    ingredients,
  } = req.body;
  //console.log("PUT /recipes/:id - Request body:", req.body);
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    recipe.title = title;
    recipe.description = description;
    recipe.source = source;
    recipe.instructions = instructions;
    recipe.servings = servings;
    recipe.cookingTime = cookingTime;
    recipe.tags = tags;
    recipe.ingredients = ingredients;

    const updatedRecipe = await recipe.save();
    res
      .status(200)
      .json({ message: "Succesfully updated recipe", data: updatedRecipe });
  } catch (err) {
    res.status(500).json({
      message: "Could not update recipe.",
      error: err.message,
    });
  }
};
