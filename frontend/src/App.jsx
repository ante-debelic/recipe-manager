import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecipeContextProvider } from "./store/RecipeContext.jsx";
import { AppComponentsContexProvider } from "./store/AppComponentsContext.jsx";
import HomePage from "./components/HomePage.jsx";
import AllRecipes from "./components/AllRecipes.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import RecipeDetails from "./components/RecipeDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppComponentsContexProvider>
        <HomePage />
      </AppComponentsContexProvider>
    ),
  },
  {
    path: "/recipes",
    element: (
      <AppComponentsContexProvider>
        <AllRecipes />
      </AppComponentsContexProvider>
    ),
  },
  {
    path: "/recipe",
    element: (
      <AppComponentsContexProvider>
        <RecipeContextProvider>
          <RecipeForm />
        </RecipeContextProvider>
      </AppComponentsContexProvider>
    ),
  },
  {
    path: "/recipes/:recipeId",
    element: (
      <AppComponentsContexProvider>
        <RecipeDetails />
      </AppComponentsContexProvider>
    ),
  },
  {
    path: "/recipes/:recipeId/edit",
    element: (
      <AppComponentsContexProvider>
        <RecipeContextProvider>
          <RecipeForm />
        </RecipeContextProvider>
      </AppComponentsContexProvider>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
