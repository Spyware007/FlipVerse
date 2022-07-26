import React from "react";
import classes from "./InputField.module.css";
import errorpng from "../../../Assets/error.png";
const InputField = ({
  value,
  label,
  reference,
  name,
  placeholder,
  type,
  onChange,
  required,
  error = "",
}) => {
  return (
    <>
      <div className={`${classes.form__group} ${classes.field}`}>
        <input
          ref={reference}
          type={type}
          value={value}
          name={name}
          className={classes.form__field}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
        {label && (
          <label className={classes.form__label} htmlFor={`${name}`}>
            {label}
          </label>
        )}
        {error && (
          <p className={classes.error}>
            {""}
            <img className={classes.errorpng} src={errorpng} alt="error" />
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
