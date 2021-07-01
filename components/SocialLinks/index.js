import React from "react";
import SocialLinksModules from "./socialLinks.module.css";

export default function SocialLinks({onGoogleClick, onFacebookClick}) {

  return (
    <section className={SocialLinksModules.main}>
      <p>Entre com suas redes sociais</p>
      <div className={SocialLinksModules.socialNetwork}>
        <button
          onClick={onFacebookClick}
          className={SocialLinksModules.wrapperSocial}
          style={{
            background: "#1354AB",
            color: "white",
          }}
        >
          <i className="fab fa-facebook-f"></i>
        </button>
        <button
          onClick={onGoogleClick}
          className={SocialLinksModules.wrapperSocial}
          style={{
            background: "#F65B5B",
            color: "white",
          }}
        >
          <i className="fab fa-google"></i>
        </button>
      </div>
    </section>
  );
}
