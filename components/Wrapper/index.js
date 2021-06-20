import React from "react";
import WrapperStyle from "./wrapper.module.css";

export default function Wrapper({ children, title }) {
  return (
    <div className={WrapperStyle.main}>
      <section className={WrapperStyle.titleWrapper}>
        <h1>{title}</h1>
      </section>
      <section className={WrapperStyle.mainContent}>{children}</section>
    </div>
  );
}
