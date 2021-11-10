import React from "react";
import "./NovelBackDrop.scss";

const NovelBackDrop = ({ children }) => {
  return <div className="backdrop-container">{children}</div>;
};

export default NovelBackDrop;
