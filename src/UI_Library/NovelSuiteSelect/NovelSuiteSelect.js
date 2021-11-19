import React, { useCallback, useState } from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelSuiteSelect.scss";

const NovelSuiteSelect = ({
  className,
  items = [],
  name,
  placeholder,
  required = false,
  keyValue,
  onChange,
  keyId,
  value,
  keyLabel,
  label,
  ...rest
}) => {
  const addAllSelectCssClasses = (initialClass, propsClass) => {
    UIElementHelper.getllClasses(initialClass, propsClass);
  };

  const [selectValue, setSelectValue] = useState("");

  useCallback(() => {
    console.log("callback run");
  }, [value]);

  /***
   * Set Default Props for Web Accessibility
   */
  const defaultNovelSelectProps = {
    "arial-label": name,
    required: required,
    placeholder: placeholder,

    ...rest,
  };

  const onChangeSelectValue = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <select
      className={addAllSelectCssClasses("novel-select-root", className)}
      {...defaultNovelSelectProps}
      onChange={onChangeSelectValue}
    >
      <option value="">{label}</option>
      {items.map((optionItem, index) => {
        return (
          <option value={optionItem[keyValue]} key={optionItem[keyId]}>
            {optionItem[keyLabel]}
          </option>
        );
      })}
    </select>
  );
};

export default NovelSuiteSelect;
