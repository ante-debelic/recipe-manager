const express = require("express");
const recipeController = require("../controllers/recipes");
const multer = require("multer");

const { storage } = require("../cloudinary");
const upload = multer({ storage });

const router = express.Router();

router.post("/", upload.single("image"), recipeController.createRecipe);

router.get("/", recipeController.getRecipes);

router.get("/:recipeId", recipeController.getRecipe);

router.delete("/:recipeId", recipeController.deleteRecipe);

router.put("/:recipeId", recipeController.editRecipe);

module.exports = router;
