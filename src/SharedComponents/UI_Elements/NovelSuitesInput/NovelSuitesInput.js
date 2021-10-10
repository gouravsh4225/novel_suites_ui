import React from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelSuitesInput.scss";

const NovelSuitesInput = (props) => {
  const { onChange, className, style, value } = props;
  const onInputChange = (event) => {
    event.preventDefault();
    const { target } = event;
    onChange && onChange(event, target.value);
  };

  return (
    <input
      className={UIElementHelper.getllClasses(
        "novel-suite-input novel-form-input",
        className
      )}
      style={style}
      onChange={onInputChange}
      value={value}
    />
  );
};

export default NovelSuitesInput;
