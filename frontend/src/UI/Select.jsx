import selectClasses from "./Select.module.css";

export default function Select({ invalidInput, ...props }) {
  return (
    <select
      className={`${selectClasses.units} ${
        invalidInput && selectClasses.invalid
      }`}
      {...props}
    >
      <option value="">Units</option>
      <hr />
      <optgroup label="Metric">
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
        <option value="-"></option>
      </optgroup>
      <hr />
      <optgroup label="US standard">
        <option value="lb">lb</option>
        <option value="oz">oz</option>
        <option value="cup">cup</option>
        <option value="tsp">tsp</option>
        <option value="tbsp">tbsp</option>
        <option value="slices">slices</option>
        <option value="pinch">pinch</option>
      </optgroup>
    </select>
  );
}
