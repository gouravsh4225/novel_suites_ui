import React from "react";
import "./NovelSuitesButton.scss";

const NovelSuitesButton = ({
  type,
  onClick,
  className,
  buttonLabel,
  style,
}) => {
  const getAllClasses = () => {
    return className ? ["novel-button", className].join(" ") : "novel-button";
  };

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
      onClick={() => onButtonClick()}
      className={getAllClasses()}
      {...style}
    >
      {buttonLabel}
    </button>
  );
};

export default NovelSuitesButton;
