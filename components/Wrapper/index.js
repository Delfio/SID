import React from "react";
import WrapperStyle from "./wrapper.module.css";
import Image from 'next/image';

export default function Wrapper({ children, title }) {
  return (
    <div className={WrapperStyle.main}>
      <section className={WrapperStyle.titleWrapper}>
        <Image 
          src="/img/logo.png"
          alt={title}
          // className="rounded mx-auto d-block"
          width="100%"
          height="auto"
        />
      </section>
      <section className={WrapperStyle.mainContent}>{children}</section>
    </div>
  );
}
