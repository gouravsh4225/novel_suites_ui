import React from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelCard.scss";

const getAllStylingClass = (inital, propsClass) =>
  UIElementHelper.getllClasses(inital, propsClass);

const NovelCardContent = ({ children, className, ...rest }) => {
  return (
    <div
      className={getAllStylingClass("novel-card-content", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

const NovelCardFooter = ({ children, className, ...rest }) => {
  return (
    <div
      className={getAllStylingClass("novel-card-footer", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

const NovelCardHeaderImage = ({ children, className, ...rest }) => {};

const NovelCardHeader = ({ children, className, ...rest }) => {};

const NovelCard = ({ children, className, ...rest }) => {
  return (
    <div className={getAllStylingClass("novel-card", className)} {...rest}>
      {children}
    </div>
  );
};
NovelCard.HeaderImage = NovelCardHeaderImage;
NovelCard.Header = NovelCardHeader;
NovelCard.Content = NovelCardContent;
NovelCard.Footer = NovelCardFooter;
export { NovelCard };
