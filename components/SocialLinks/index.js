import React from "react";
import SocialLinksModules from "./socialLinks.module.css";

export default function SocialLinks() {
  return (
    <section className={SocialLinksModules.main}>
      <p>Entre com suas redes sociais</p>
      <div className={SocialLinksModules.socialNetwork}>
        <a
          className={SocialLinksModules.wrapperSocial}
          style={{
            background: "#1354AB",
            color: "white",
          }}
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          className={SocialLinksModules.wrapperSocial}
          style={{
            background: "#F65B5B",
            color: "white",
          }}
        >
          <i className="fab fa-google"></i>
        </a>
      </div>
    </section>
  );
}
