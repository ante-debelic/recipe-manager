export async function searchRecipes(query, page = 1) {
  try {
    const res = await fetch(
      `http://localhost:3000/recipes?query=${query}&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch recipes ):");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getRecipes(page = 1, tag) {
  let url = `http://localhost:3000/recipes?page=${page}`;

  if (tag) {
    url += `&tag=${tag}`;
  }
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch recipes ):");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createRecipe(recipeData) {
  const fd = new FormData();

  fd.append("title", recipeData.title);
  fd.append("description", recipeData.description);
  fd.append("source", recipeData.source);
  fd.append("instructions", recipeData.instructions);
  fd.append("servings", recipeData.servings);
  fd.append("cookingTime", recipeData.cookingTime);
  fd.append("tags", JSON.stringify(recipeData.tags));
  fd.append("ingredients", JSON.stringify(recipeData.ingredients));

  if (recipeData.image) {
    fd.append("image", recipeData.image);
  }

  const res = await fetch("http://localhost:3000/recipes", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    throw new Error("Failed to create recipe:(");
  }
  const data = await res.json();
  return data;
}

export async function getRecipe(recipeId) {
  const res = await fetch(`http://localhost:3000/recipes/${recipeId}`);
  if (!res.ok) {
    throw new Error("Error fetching recipe.");
  }
  const recipe = await res.json();
  return recipe;
}

export async function deleteSelectedRecipe(recipeId) {
  const res = await fetch(`http://localhost:3000/recipes/${recipeId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error deleting recipe.");
  }
  return await res.json();
}

export async function editRecipe(updatedData, recipeId) {
  const res = await fetch(`http://localhost:3000/recipes/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) {
    throw new Error("Failed to update recipe.");
  }
  const updatedRecipe = await res.json();
  return updatedRecipe.data;
}
