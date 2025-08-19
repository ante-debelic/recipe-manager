export const TAG_OPTIONS = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Salad",
  "Vegetarian",
  "Sugar free",
];

export function createEmptyIngredientsInput() {
  return Array.from({ length: 1 }, () => {
    return { title: "", quantity: "", unit: "" };
  });
}

export function createEmptyIngredientsValidation() {
  return Array.from({ length: 1 }, () => ({
    title: false,
    quantity: false,
    unit: false,
  }));
}
