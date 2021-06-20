import React from "react";
import ButtonStyle from './button.module.css';

export default function Button({ onClick, label }) {
  return <button className={ButtonStyle.main} onClick={onClick}>{label}</button>;
}
