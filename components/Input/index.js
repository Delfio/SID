import React from "react";
import InputStyle from "./input.module.css";

function Input({
  type,
  placehold,
  error,
}, ref) {

  const [value, setValue] = React.useState('');
  
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