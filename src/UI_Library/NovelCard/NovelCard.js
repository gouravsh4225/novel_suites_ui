import React from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelCard.scss";

const getAllStylingClass = (inital, propsClass) =>
  UIElementHelper.getllClasses(inital, propsClass);

const NovelCardContent = ({ children, className }) => {
  return (
    <div className={getAllStylingClass("novel-card-content", className)}>
      {children}
    </div>
  );
};

const NovelCardFooter = ({ children, className }) => {
  return (
    <div className={getAllStylingClass("novel-card-footer", className)}>
      {children}
    </div>
  );
};

const NovelCard = ({ children, className }) => {
  return (
    <div className={getAllStylingClass("novel-card", className)}>
      {children}
    </div>
  );
};

NovelCard.Content = NovelCardContent;
NovelCard.Footer = NovelCardFooter;
export { NovelCard };
