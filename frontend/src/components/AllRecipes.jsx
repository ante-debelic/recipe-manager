import { HiSearch } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import allRecipesClasses from "./AllRecipes.module.css";
import recipeCardClasses from "./RecipeCard.module.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppComponentsContex from "../store/AppComponentsContext.jsx";
import Button from "../UI/Button.jsx";
import RecipeCard from "./RecipeCard.jsx";
import FilterRibbon from "./FilterRibbon.jsx";
import PaginationButtons from "../UI/PaginationButtons.jsx";

export default function AllRecipes() {
  const {
    isLoading,
    error,
    fetchRecipes,
    allRecipes: recipes,
    query,
    handleSearchRecipe,
    searchRcipesHandler,
  } = useContext(AppComponentsContex);

  const navigate = useNavigate();
  function handleClickHome() {
    navigate("/");
  }

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (isLoading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>Error:{error}</p>;
  }

  if (!recipes || recipes.length === 0) return <p>No recipes found</p>;

  function handleSearchSubmit(e) {
    e.preventDefault();
    searchRcipesHandler(query);
  }

  return (
    <>
      <div className={allRecipesClasses.recipes_container}>
        <div className={allRecipesClasses.recipes_ribbon}>
          <Button onClick={handleClickHome} btnCaption={<FaAngleLeft />} />
          <p>Recipe Manager</p>
        </div>
        <form
          className={allRecipesClasses.search_recipe}
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            value={query}
            onChange={handleSearchRecipe}
            placeholder="Search by dish or ingredient..."
          />
          <button>
            <HiSearch />
          </button>
        </form>
        <FilterRibbon />
        <h2 className={allRecipesClasses.title}>Try Recipes:</h2>
        <ul className={recipeCardClasses.recipes_list}>
          {recipes.map((recipe, index) => {
            return <RecipeCard key={index} recipe={recipe} />;
          })}
        </ul>
        <PaginationButtons />
      </div>
    </>
  );
}
