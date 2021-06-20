import React from "react";
import InputStyle from "./input.module.css";

export default function Input({
  type,
  placehold,
  value,
  onBlur,
  onChange,
  error,
}) {

  return (
    <input
      type={type}
      className={InputStyle.main}
      placeholder={placehold}
      value={value}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
