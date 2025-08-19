import { useNavigate } from "react-router-dom";
import recipeCardClasses from "./RecipeCard.module.css";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/recipes/${recipe._id}`);
  }

  return (
    <li onClick={handleClick} className={recipeCardClasses.recipe_card}>
      <img src={recipe.image} alt="photo of a meal" />
      <div className={recipeCardClasses.content}>
        <p>{recipe.title}</p>
        <p>Source: {recipe.source}</p>
        <p>Servings:{recipe.servings} </p>
      </div>
    </li>
  );
}
