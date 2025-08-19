export function isEmpty(value) {
  console.log("Validating:", value, typeof value);
  if (typeof value === "string") {
    return value.trim() === "";
  }
  if (typeof value === "number") {
    return false;
  }
  if (value instanceof File) {
    return !value.name;
  }
}
