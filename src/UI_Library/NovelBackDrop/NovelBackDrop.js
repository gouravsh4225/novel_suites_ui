import React from "react";
import UIElementHelper from "../UI_Element_helpers";

import "./NovelBackDrop.scss";

const NovelBackDrop = ({ children, className, style }) => {
  return (
    <div
      className={UIElementHelper.getllClasses("backdrop-container", className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default NovelBackDrop;
