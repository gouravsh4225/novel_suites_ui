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
}) => {
  const onButtonClick = (event) => {
    event.preventDefault();
    onClick && onClick();
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
    >
      {buttonLabel}
    </button>
  );
};

export default NovelSuitesButton;
