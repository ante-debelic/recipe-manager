import { useContext } from "react";
import RecipeContext from "../store/RecipeContext";
import Input from "../UI/Input";
import Select from "../UI/Select";

export default function FormIngredient({
  index,
  ingredient,
  onChange,
  validateIngredientFields,
}) {
  function handleChange(field, value) {
    onChange(index, { ...ingredient, [field]: value });
  }
  const { validationErrors } = useContext(RecipeContext);

  return (
    <>
      <Input
        type="text"
        placeholder=" Enter ingredient"
        inputOnly
        onChange={(e) => {
          handleChange("title", e.target.value);
          validateIngredientFields(
            "ingredients",
            e.target.value,
            index,
            "title"
          );
        }}
        onBlur={(e) =>
          validateIngredientFields(
            "ingredients",
            e.target.value,
            index,
            "title"
          )
        }
        value={ingredient.title}
        invalidInput={validationErrors.ingredients[index]?.title}
      />

      <Input
        type="number"
        placeholder=" Qty"
        id="ing_quantity"
        onChange={(e) => {
          handleChange("quantity", e.target.value);
          validateIngredientFields(
            "ingredients",
            e.target.value,
            index,
            "quantity"
          );
        }}
        onBlur={(e) =>
          validateIngredientFields(
            "ingredients",
            e.target.value,
            index,
            "quantity"
          )
        }
        value={ingredient.quantity}
        invalidInput={validationErrors.ingredients[index]?.quantity}
        min="0"
        inputOnly
      />

      <Select
        name="unit"
        onChange={(e) => {
          handleChange("unit", e.target.value);
          validateIngredientFields(
            "ingredients",
            e.target.value,
            index,
            "unit"
          );
        }}
        onBlur={(e) =>
          validateIngredientFields("ingredients", e.target.value, index, "unit")
        }
        value={ingredient.unit}
        invalidInput={validationErrors.ingredients[index]?.unit}
      />
    </>
  );
}
