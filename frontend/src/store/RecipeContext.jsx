import { useParams } from "react-router-dom";
import { createContext, useState, useContext, useEffect } from "react";
import AppComponentsContex from "./AppComponentsContext.jsx";
import { createEmptyIngredientsInput } from "../utils/config.js";
import { createRecipe } from "../http.js";
import { isEmpty } from "../utils/inputValidation.js";

const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const {
    showModal,
    setAllRecipes,
    editSelectedRecipe,
    selectedRecipe,
    fetchRecipe,
  } = useContext(AppComponentsContex);

  const { recipeId } = useParams();
  const isEditMode = !!recipeId;

  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    source: "",
    instructions: "",
    image: null,
    servings: "",
    cookingTime: "",
    tags: [],
    ingredients: createEmptyIngredientsInput(),
  });

  const [validationErrors, setValidationErrors] = useState({
    title: false,
    description: false,
    source: false,
    instructions: false,
    image: false,
    servings: false,
    cookingTime: false,
    tags: [],
    ingredients: [],
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleAddIngredient() {
    setRecipeData((prevData) => {
      return {
        ...prevData,
        ingredients: [
          ...prevData.ingredients,
          { title: "", quantity: "", unit: "" },
        ],
      };
    });
    setValidationErrors((prevErrors) => {
      return {
        ...prevErrors,
        ingredients: [
          {
            ...prevErrors.ingredients,
            title: false,
            quantity: false,
            unit: false,
          },
        ],
      };
    });
  }

  function handleDeleteIngredient(index) {
    setRecipeData((prevData) => {
      if (prevData.ingredients.length <= 1) return prevData;

      return {
        ...prevData,
        ingredients: prevData.ingredients.filter((_, i) => i !== index),
      };
    });
    setValidationErrors((prevErrors) => {
      if (prevErrors.ingredients.length <= 1) return prevErrors;
      return {
        ...prevErrors,
        ingredients: prevErrors.ingredients.filter((_, i) => i !== index),
      };
    });
  }

  useEffect(() => {
    if (isEditMode && !selectedRecipe) {
      fetchRecipe(recipeId);
    }
  }, [isEditMode, selectedRecipe, fetchRecipe, recipeId]);

  useEffect(() => {
    if (isEditMode && selectedRecipe) {
      setRecipeData({
        title: selectedRecipe.title || "",
        description: selectedRecipe.description || "",
        source: selectedRecipe.source || "",
        instructions: selectedRecipe.instructions || "",
        image: selectedRecipe.image || null,
        servings: selectedRecipe.servings || "",
        cookingTime: selectedRecipe.cookingTime || "",
        tags: Array.isArray(selectedRecipe.tags) ? selectedRecipe.tags : [],
        ingredients: selectedRecipe.ingredients?.length
          ? selectedRecipe.ingredients
          : createEmptyIngredientsInput(selectedRecipe.ingredients?.length),
      });
    }
  }, [selectedRecipe, isEditMode]);

  function resetFormInputs() {
    setRecipeData({
      title: "",
      description: "",
      source: "",
      instructions: "",
      image: null,
      servings: "",
      cookingTime: "",
      tags: [],
      ingredients: createEmptyIngredientsInput(),
    });

    setValidationErrors({
      title: false,
      description: false,
      source: false,
      instructions: false,
      image: false,
      servings: false,
      cookingTime: false,
      tags: false,
      ingredients: createEmptyIngredientsInput().map(() => ({
        title: false,
        quantity: false,
        unit: false,
      })),
    });
  }

  function validateField(identifier, value, index, subField) {
    setValidationErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (
        identifier === "ingredients" &&
        typeof index === "number" &&
        subField
      ) {
        updatedErrors.ingredients = [...prevErrors.ingredients];
        updatedErrors.ingredients[index] = {
          ...updatedErrors.ingredients[index],
          [subField]: isEmpty(value),
        };
      } else {
        updatedErrors[identifier] = isEmpty(value);
      }
      return updatedErrors;
    });
  }

  function validateFormOnSubmit() {
    const inputErrors = {
      title: isEmpty(recipeData.title),
      description: isEmpty(recipeData.description),
      source: isEmpty(recipeData.source),
      instructions: isEmpty(recipeData.instructions),
      image: isEmpty(recipeData.image),
      servings: isEmpty(recipeData.servings),
      cookingTime: isEmpty(recipeData.cookingTime),
      tags: recipeData.tags.length === 0,
      ingredients: recipeData.ingredients.map((ing) => {
        return {
          title: isEmpty(ing.title),
          quantity: isEmpty(ing.quantity),
          unit: isEmpty(ing.unit),
        };
      }),
    };
    setValidationErrors(inputErrors);

    const formInvalid =
      inputErrors.title ||
      inputErrors.description ||
      inputErrors.source ||
      inputErrors.instructions ||
      inputErrors.image ||
      inputErrors.servings ||
      inputErrors.cookingTime ||
      inputErrors.tags ||
      inputErrors.ingredients.some(
        (ing) => ing.title || ing.quantity || ing.unit
      );
    return !formInvalid;
  }

  function handleTagsChange(e) {
    const checked = e.target.checked;
    const tag = e.target.value;
    setRecipeData((prevData) => {
      if (checked) {
        return { ...prevData, tags: [...prevData.tags, tag] };
      }
      if (!checked) {
        return { ...prevData, tags: prevData.tags.filter((t) => t !== tag) };
      }
    });
    setValidationErrors((prevErrors) => {
      return { ...prevErrors, tags: false };
    });
  }

  function handleIngredientChange(index, newIngredient) {
    setRecipeData((prevData) => {
      const updatedIngredients = [...prevData.ingredients];
      updatedIngredients[index] = newIngredient;
      return { ...prevData, ingredients: updatedIngredients };
    });
  }

  function onRecipeDataChange(identifier, value) {
    setRecipeData((prevRecipeData) => {
      return { ...prevRecipeData, [identifier]: value };
    });
  }

  async function createNewRecipe() {
    try {
      const resData = await createRecipe({
        title: recipeData.title,
        description: recipeData.description,
        source: recipeData.source,
        instructions: recipeData.instructions,
        image: recipeData.image,
        servings: +recipeData.servings,
        cookingTime: +recipeData.cookingTime,
        tags: recipeData.tags,
        ingredients: recipeData.ingredients,
      });
      setAllRecipes((prevRecipes) => {
        return [...prevRecipes, resData.data];
      });
    } catch (err) {
      console.log(err);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    const validForm = validateFormOnSubmit();
    if (!validForm) return;
    if (isEditMode) {
      editSelectedRecipe({ ...recipeData, _id: recipeId });
    } else {
      createNewRecipe();
      resetFormInputs();
      showModal();
    }
  }
  const ctxValues = {
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
  };

  return (
    <RecipeContext.Provider value={ctxValues}>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
