import React from "react";
import NovelSuitesLabel from "../NovelSuitesLabel/NovelSuitesLabel";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelSuitesInput.scss";

const NovelSuitesInput = (props) => {
  const {
    onChange,
    className,
    style,
    value,
    errorText,
    required,
    name,
    inputLabel,
    inputLabelClasses,
    validatior,
    placeholder,
    autoFocus,
    type,
    ...rest
  } = props;

  /***
   * Set Default Props for Web Accessibility
   */
  const defaultNovelInputProps = {
    "arial-label": name,
    required: required,
    placeholder: placeholder,

    ...rest,
  };
  const onInputChange = (event) => {
    event.preventDefault();
    const { target } = event;
    onChange && onChange(event, target.value);
  };

  const onFocusInput = (event) => {
    event.preventDefault();
  };

  const onBlur = (event) => {
    event.preventDefault();
  };

  return (
    <div className="novel-input-wrapper">
      <NovelSuitesLabel
        labelName={inputLabel}
        htmlFor={name}
        className={UIElementHelper.getllClasses(
          "novel-label--input",
          inputLabelClasses
        )}
      />
      <input
        type={type}
        className={UIElementHelper.getllClasses(
          "novel-suite-input novel-form-input",
          errorText ? "novel-suite-input--error" : "",
          className
        )}
        style={style}
        onChange={onInputChange}
        onFocus={onFocusInput}
        onBlur={onBlur}
        value={value}
        required={required}
        name
        style={style}
        autoFocus={autoFocus}
        {...defaultNovelInputProps}
      />
      {errorText ? (
        <div className="novel-input-wrapper--error">{errorText}</div>
      ) : null}
    </div>
  );
};

export default NovelSuitesInput;
