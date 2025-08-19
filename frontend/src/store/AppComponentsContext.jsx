import { useSearchParams } from "react-router-dom";
import { createContext, useState, useCallback } from "react";
import {
  getRecipes,
  getRecipe,
  deleteSelectedRecipe,
  editRecipe,
  searchRecipes,
} from "../http.js";

const AppComponentsContex = createContext();

export function AppComponentsContexProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");
  const [paginationData, setPaginationData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  const [searchParams] = useSearchParams();

  const fetchRecipes = useCallback(
    async function () {
      const currentPage = parseInt(searchParams.get("page")) || 1;
      const tag = searchParams.get("tag") || null;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getRecipes(currentPage, tag);
        setAllRecipes(
          Array.isArray(data.recipes) ? data.recipes : [data.recipes]
        );
        setPaginationData(data.paginationData);
        setActiveTag(tag);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      }
      setIsLoading(false);
    },
    [searchParams]
  );

  function handleSearchRecipe(e) {
    setQuery(e.target.value);
  }

  async function searchRcipesHandler(query, page = 1) {
    try {
      const data = await searchRecipes(query, page);
      setAllRecipes(data.recipes);
      setPaginationData(data.paginationData);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchRecipe = useCallback(async function (id) {
    setIsLoading(true);
    setError(null);
    try {
      const recipe = await getRecipe(id);
      setSelectedRecipe(recipe);
      return recipe;
    } catch (err) {
      setError(err.message || "Failed to fetch recipe");
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function deleteRecipe(id) {
    try {
      const { recipeId } = await deleteSelectedRecipe(id);
      setAllRecipes((prevRecipes) => {
        return prevRecipes.filter((rec) => rec._id !== recipeId);
      });
    } catch (err) {
      setError(err.message || "Failed to fetch recipe");
    }
    setIsLoading(false);
  }

  async function editSelectedRecipe(selectedRecipe) {
    const id = selectedRecipe._id;
    try {
      const updatedRecipe = await editRecipe(
        {
          title: selectedRecipe.title,
          description: selectedRecipe.description,
          source: selectedRecipe.source,
          instructions: selectedRecipe.instructions,
          servings: +selectedRecipe.servings,
          cookingTime: +selectedRecipe.cookingTime,
          tags: selectedRecipe.tags,
          ingredients: selectedRecipe.ingredients,
        },
        id
      );
      setSelectedRecipe(updatedRecipe);
      showModal();
    } catch (err) {
      console.log(err.message);
      setError(err.message || "Failed to edit recipe");
    }
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const ctxValues = {
    setAllRecipes,
    allRecipes,
    fetchRecipes,
    isModalOpen,
    showModal,
    closeModal,
    fetchRecipe,
    selectedRecipe,
    deleteRecipe,
    editSelectedRecipe,
    handleSearchRecipe,
    searchRcipesHandler,
    activeTag,
    paginationData,
    query,
    isLoading,
    error,
  };
  return (
    <AppComponentsContex.Provider value={ctxValues}>
      {children}
    </AppComponentsContex.Provider>
  );
}
export default AppComponentsContex;
