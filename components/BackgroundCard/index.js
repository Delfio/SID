import React from "react";
import SocialCardStyle from "./background-card.module.css";

const bgCart = ({ children, bg }) => {
  return (
    <div
      className={SocialCardStyle.main}
      style={{
        background: `url('/img/bg-cards/layout${bg}.png') no-repeat center/cover`,
      }}
    >
      {children}
    </div>
  );
};

const BgCard = React.memo(bgCart);

export default BgCard;
