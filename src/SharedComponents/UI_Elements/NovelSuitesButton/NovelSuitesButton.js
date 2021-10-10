import React from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelSuitesButton.scss";

const NovelSuitesButton = ({
  type,
  onClick,
  className,
  buttonLabel,
  style,
}) => {
  const onButtonClick = (event) => {
    event.preventDefault();
    onClick && onClick();
  };

  const getButtonType = () => {
    return type ? type : "button";
  };

  return (
    <button
      type={getButtonType()}
      onClick={(event) => onButtonClick(event)}
      className={UIElementHelper.getllClasses("novel-button", className)}
      style={style}
    >
      {buttonLabel}
    </button>
  );
};

export default NovelSuitesButton;
