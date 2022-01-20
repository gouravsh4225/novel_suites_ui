import React from "react";
import UIElementHelper from "../../UI_Library/UI_Element_helpers";
import "./NovelSkeleton.scss";

const addAllSkeletonCssClass = (initalClass, propsClasess) => {
  return UIElementHelper.getllClasses(initalClass, propsClasess);
};

const NovelSkeleton = ({ children }) => {
  return <div>{children}</div>;
};

const RoundedImage = ({ children, className }) => {
  return (
    <div
      className={addAllSkeletonCssClass("skeleton-rounded-image", className)}
    ></div>
  );
};

const SquareImage = ({ children, className, ...rest }) => {
  return (
    <div
      className={addAllSkeletonCssClass("skeleton-sqaure-image", className)}
      {...rest}
    ></div>
  );
};

const FullWidthImage = ({ children, className }) => {
  return (
    <div
      className={addAllSkeletonCssClass("skeleton-full-width-image", className)}
    ></div>
  );
};

const HalfHeading = ({ children, className, ...rest }) => {
  return (
    <div
      className={addAllSkeletonCssClass("skeleton-half-heading", className)}
      {...rest}
    ></div>
  );
};
const FullHeading = ({ children, className, ...rest }) => {
  return (
    <div
      className={addAllSkeletonCssClass("skeleton-full-heading", className)}
      {...rest}
    ></div>
  );
};

/**
 * skeleton Card Start
 */
const Card = ({ children, className }) => {
  return (
    <div className={addAllSkeletonCssClass("skeleton-card", className)}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => {
  return (
    <div className={addAllSkeletonCssClass("skeleton-card-header", className)}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className }) => {
  return (
    <div className={addAllSkeletonCssClass("skeleton-card-footer", className)}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return (
    <div className={addAllSkeletonCssClass("skeleton-card-content", className)}>
      {children}
    </div>
  );
};

/**
 * Novel Skeleton Button
 * start
 */

const Button = ({ children, className }) => {
  return (
    <div className={addAllSkeletonCssClass("skeleton-button", className)}>
      {children}
    </div>
  );
};

/**
 * Novel Skeleton Button
 * end
 */

NovelSkeleton.RoundedImage = RoundedImage;
NovelSkeleton.SquareImage = SquareImage;
NovelSkeleton.FullWidthImage = FullWidthImage;
NovelSkeleton.HalfHeading = HalfHeading;
NovelSkeleton.FullHeading = FullHeading;
NovelSkeleton.Card = Card;
NovelSkeleton.CardHeader = CardHeader;
NovelSkeleton.CardFooter = CardFooter;
NovelSkeleton.CardContent = CardContent;
NovelSkeleton.Button = Button;

export default NovelSkeleton;
