import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import {
  FaAngleLeft,
  FaPencil,
  FaRegTrashCan,
  FaUtensils,
  FaStopwatch,
  FaCarrot,
} from "react-icons/fa6";
import recipeDetailsClasses from "./RecipeDetails.module.css";
import allRecipesClasses from "./AllRecipes.module.css";
import AppComponentsContex from "../store/AppComponentsContext.jsx";
import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";

export default function RecipeDetails() {
  const {
    selectedRecipe,
    deleteRecipe,
    fetchRecipe,
    isModalOpen,
    showModal,
    closeModal,
  } = useContext(AppComponentsContex);

  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe(recipeId);
  }, [fetchRecipe, recipeId]);

  if (!selectedRecipe) {
    return <p>Loading recipe...</p>;
  }

  function handleDelete() {
    deleteRecipe(selectedRecipe._id);
    closeModal();
    navigate("/recipes");
  }

  function handleEdit() {
    navigate(`/recipes/${recipeId}/edit`);
  }

  function handleGoBack() {
    navigate("/recipes");
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        deleteModal
        onDelete={handleDelete}
        onCancel={closeModal}
      >
        <p>Recipe will be deleted!</p>
      </Modal>
      <div className={recipeDetailsClasses.recipe_details_container}>
        <div className={allRecipesClasses.recipes_ribbon}>
          <Button onClick={handleGoBack} btnCaption={<FaAngleLeft />} />
          <p>Recipe Manager</p>
          <div>
            <Button onClick={handleEdit} btnCaption={<FaPencil />} />
            <Button onClick={showModal} btnCaption={<FaRegTrashCan />} />
          </div>
        </div>
        <div className={recipeDetailsClasses.general_recipe_info}>
          <div className={recipeDetailsClasses.recipe_img}>
            <img src={selectedRecipe.image} alt="photo of a meal" />
          </div>
          <div className={recipeDetailsClasses.recipe_infos}>
            <div className={recipeDetailsClasses.recipe_name}>
              <h2>{selectedRecipe.title}</h2>
              <p>Source: {selectedRecipe.source}</p>
            </div>
            <div className={recipeDetailsClasses.recipe_short_infos}>
              <p>
                <span>
                  <FaUtensils />
                </span>
                {selectedRecipe.servings} Servings
              </p>
              <p>
                <span>
                  <FaStopwatch />
                </span>
                Cook: {selectedRecipe.cookingTime} mins
              </p>
              <p>
                <span>
                  <FaCarrot />
                </span>
                {selectedRecipe.ingredients.length} Ingredients
              </p>
            </div>
            <div className={recipeDetailsClasses.recipe_tags}>
              {selectedRecipe.tags.map((tag) => (
                <Button key={tag} btnCaption={tag} />
              ))}
            </div>
            <div className={recipeDetailsClasses.recipe_description}>
              <h3>Description</h3>
              <p>{selectedRecipe.description}</p>
            </div>
          </div>
        </div>
        <div className={recipeDetailsClasses.detailed_recipe_info}>
          <div className={recipeDetailsClasses.recipe_ingredients}>
            <h3>Ingredients</h3>
            <ul className={recipeDetailsClasses.ings_list}>
              {selectedRecipe?.ingredients.map((ing, idx) => {
                return (
                  <li
                    key={idx}
                    className={recipeDetailsClasses.recipe_ingredient}
                  >
                    <p className={recipeDetailsClasses.ingredient_qty}>
                      {ing.quantity}
                    </p>
                    <p className={recipeDetailsClasses.ingredient_unit}>
                      {ing.unit}
                    </p>
                    <p className={recipeDetailsClasses.ingredient_name}>
                      {ing.title}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={recipeDetailsClasses.recipe_instructions}>
            <h3>Instructions</h3>
            <ul className={recipeDetailsClasses.instructions_list}>
              {selectedRecipe?.instructions
                .trim()
                .split("\n")

                .map((step, index) => {
                  return (
                    <li
                      key={index}
                      className={recipeDetailsClasses.recipe_step}
                    >
                      <p>{step}</p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
