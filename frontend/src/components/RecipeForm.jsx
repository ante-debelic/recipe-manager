import { useContext, useEffect } from "react";
import RecipeContext from "../store/RecipeContext.jsx";
import AppComponentsContex from "../store/AppComponentsContext.jsx";
import { useNavigate } from "react-router-dom";
import recipeFormClasses from "./RecipeForm.module.css";
import formIngredientClasses from "./FormIngredient.module.css";
import {
  FaAngleLeft,
  FaRegTrashCan,
  FaPlus,
  FaFloppyDisk,
} from "react-icons/fa6";
import { TAG_OPTIONS } from "../utils/config.js";
import Input from "../UI/Input.jsx";
import FormIngredient from "./FormIngredient.jsx";
import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";

export default function RecipeForm() {
  const {
    recipeData,
    handleIngredientChange,
    onRecipeDataChange,
    handleTagsChange,
    formSubmitted,
    handleSubmit,
    validateField,
    validationErrors,
    isEditMode,
    recipeId,
    handleAddIngredient,
    handleDeleteIngredient,
  } = useContext(RecipeContext);

  const { isModalOpen, closeModal, selectedRecipe, fetchRecipe } =
    useContext(AppComponentsContex);

  const navigate = useNavigate();

  function handleGoToRecipes() {
    navigate("/recipes");
  }

  function handleCloseModal() {
    closeModal();
    handleGoToRecipes();
  }

  useEffect(() => {
    if (isEditMode && !selectedRecipe) {
      fetchRecipe(recipeId);
    }
  }, [isEditMode, recipeId, selectedRecipe, fetchRecipe]);

  if (isEditMode && !selectedRecipe) {
    return <p>Loading recipe data...</p>;
  }

  return (
    <>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <p>Successfully {!isEditMode ? "added new" : "edited"} a meal! </p>
      </Modal>
      <div className={recipeFormClasses.form_box}>
        <form
          onSubmit={handleSubmit}
          className={recipeFormClasses.new_recipe_form}
          encType="multipart/form-data"
        >
          <div className={recipeFormClasses.form_ribbon}>
            <Button
              type="button"
              className={recipeFormClasses.ribbon_button}
              btnCaption={<FaAngleLeft />}
              onClick={handleGoToRecipes}
            />
            <p>Recipe Manager</p>
            <Button
              type="submit"
              className={recipeFormClasses.ribbon_button}
              btnIcon
              icon={<FaFloppyDisk />}
            />
          </div>
          <div className={recipeFormClasses.left_side}>
            <h2>General Information</h2>
            <Input
              id="recipe_name"
              type="text"
              placeholder=" Recipe name"
              label="Name"
              value={recipeData.title}
              invalidInput={validationErrors.title}
              onChange={(e) => {
                onRecipeDataChange("title", e.target.value);
                validateField("title", e.target.value);
              }}
              onBlur={(e) => validateField("title", e.target.value)}
            />
            <Input
              id="recipe_description"
              label="Description"
              value={recipeData.description}
              invalidInput={validationErrors.description}
              onChange={(e) => {
                onRecipeDataChange("description", e.target.value);
                validateField("description", e.target.value);
              }}
              onBlur={(e) => validateField("description", e.target.value)}
            />
            <Input
              id="recipe_source"
              type="text"
              placeholder=" Recipe source"
              label="Source"
              value={recipeData.source}
              invalidInput={validationErrors.source}
              onChange={(e) => {
                onRecipeDataChange("source", e.target.value);
                validateField("source", e.target.value);
              }}
              onBlur={(e) => validateField("source", e.target.value)}
            />
            <Input
              id="recipe_instructions"
              label="Instructions"
              value={recipeData.instructions}
              invalidInput={validationErrors.description}
              onChange={(e) => {
                onRecipeDataChange("instructions", e.target.value);
                validateField("instructions", e.target.value);
              }}
              onBlur={(e) => validateField("instructions", e.target.value)}
            />
          </div>

          <div className={recipeFormClasses.right_side}>
            <h2>Additional Information</h2>
            <div className={recipeFormClasses.additional_info}>
              <Input
                label="Recipe photos"
                type="file"
                id="images"
                name="image"
                onChange={(e) => {
                  onRecipeDataChange("image", e.target.files[0]);
                  validateField("image", e.target.files[0]);
                }}
              />
              <h3>Tags:</h3>
              <div className={recipeFormClasses.tags_container}>
                {TAG_OPTIONS.map((tag) => {
                  return (
                    <div key={tag} className={recipeFormClasses.tag_container}>
                      <Input
                        type="checkbox"
                        id={tag}
                        label={tag}
                        value={tag}
                        onChange={(e) => {
                          handleTagsChange(e);
                        }}
                        checked={recipeData.tags.includes(tag)}
                        invalidInput={formSubmitted && validationErrors.tags}
                      />
                    </div>
                  );
                })}
              </div>
              <h2
                className={recipeFormClasses.right_side.additional_info_title}
              >
                Time required & Servings:
              </h2>
              <div className={recipeFormClasses.additional_recipe_info}>
                <div className={recipeFormClasses.servings}>
                  <Input
                    type="number"
                    id="servings"
                    label="Servings"
                    min="1"
                    value={recipeData.servings}
                    invalidInput={validationErrors.servings}
                    onChange={(e) => {
                      onRecipeDataChange("servings", e.target.value);
                      validateField("servings", e.target.value);
                    }}
                    onBlur={(e) => validateField("servings", e.target.value)}
                  />
                </div>
                <div className={recipeFormClasses.cook_time}>
                  <Input
                    type="number"
                    id="cook_time"
                    label="Cooking Time"
                    min="1"
                    value={recipeData.cookingTime}
                    invalidInput={validationErrors.cookingTime}
                    onChange={(e) => {
                      onRecipeDataChange("cookingTime", e.target.value);
                      validateField("cookingTime", e.target.value);
                    }}
                    onBlur={(e) => {
                      validateField("cookingTime", e.target.value);
                    }}
                  />
                  <span>min</span>
                </div>
              </div>
            </div>
            <h2>Ingredients</h2>
            <div className={recipeFormClasses.add_ingredients_box}>
              <h3>Add more ingredients</h3>
              <Button
                className={formIngredientClasses.button}
                type="button"
                btnIcon
                icon={<FaPlus />}
                onClick={handleAddIngredient}
              />
            </div>

            <ul className={formIngredientClasses.ingredients_list}>
              {recipeData.ingredients.map((ingredient, index) => {
                return (
                  <li key={index}>
                    <FormIngredient
                      onChange={handleIngredientChange}
                      validateIngredientFields={validateField}
                      ingredient={ingredient}
                      index={index}
                    />

                    {index >= 1 && (
                      <Button
                        className={formIngredientClasses.button}
                        type="button"
                        btnCaption={<FaRegTrashCan />}
                        onClick={() => handleDeleteIngredient(index)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </form>
      </div>
    </>
  );
}
