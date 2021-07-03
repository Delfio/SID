import React from "react";
import InputStyle from "./input.module.css";

function Input({
  type,
  placehold,
  initialValue='',
  error,
}, ref) {

  const [value, setValue] = React.useState(initialValue);
  return (
    <input
      type={type}
      className={InputStyle.main}
      placeholder={placehold}
      value={value}
      ref={ref}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
export default React.forwardRef(Input);