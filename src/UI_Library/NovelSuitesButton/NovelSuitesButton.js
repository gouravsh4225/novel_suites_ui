import React from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelSuitesButton.scss";

const NovelSuitesButton = ({
  type,
  onClick,
  className,
  buttonLabel,
  style,
  disabled,
  children,
  title,
}) => {
  const onButtonClick = (event) => {
    event.preventDefault();
    onClick && onClick(event);
  };

  const getButtonType = () => {
    return type ? type : "button";
  };

  const getButtonAllClasses = () => {
    return UIElementHelper.getllClasses(
      "novel-button",
      disabled ? "novel-button--disabled" : "",
      className
    );
  };

  return (
    <button
      type={getButtonType()}
      onClick={(event) => onButtonClick(event)}
      className={getButtonAllClasses()}
      style={style}
      disabled={disabled}
      title={title ? title : buttonLabel}
    >
      {buttonLabel ? buttonLabel : children}
    </button>
  );
};

export default NovelSuitesButton;
