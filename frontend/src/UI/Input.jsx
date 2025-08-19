import classes from "./Input.module.css";
import { HiOutlineSun } from "react-icons/hi";

export default function Input({
  label,
  id,
  inputOnly,
  invalidInput,
  type,
  ...props
}) {
  const cssInputClasses = `${classes.input} ${
    type === "number" ? classes.number_input : ""
  } ${type === "text" ? classes.text_input : ""} ${
    type === "file" ? classes.file_input : ""
  } ${type === "checkbox" ? classes.checkbox_input : ""} `;

  let content = (
    <>
      <div className={classes.label_wrapper}>
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
        {type !== "checkbox" && (
          <HiOutlineSun
            className={`${classes.error_icon} ${
              invalidInput ? classes.visible : classes.hidden
            } `}
          />
        )}
      </div>
      {label === "Description" || label === "Instructions" ? (
        <textarea
          id={id}
          className={`${classes.textarea} ${
            invalidInput ? classes.invalid : ""
          }`}
          rows={3}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`${cssInputClasses} ${
            invalidInput ? classes.invalid : ""
          }`}
          {...props}
        />
      )}
    </>
  );

  if (inputOnly) {
    content = (
      <>
        <div className={classes.onlyInput_wrapper}>
          <input
            id={id}
            type={type}
            className={`${classes.input} ${
              type === "number" ? classes.number_input : classes.text_input
            } ${invalidInput ? classes.invalid : ""}`}
            {...props}
          />
          <HiOutlineSun
            className={`${classes.error_icon} ${
              invalidInput ? classes.visible : classes.hidden
            }`}
          />
        </div>
      </>
    );
  }

  return <>{content}</>;
}
