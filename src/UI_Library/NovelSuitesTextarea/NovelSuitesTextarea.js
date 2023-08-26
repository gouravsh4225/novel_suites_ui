import React from "react";
import { Label } from "../UI_Library";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelSuitesTextarea.scss";

const NovelSuitesTextarea = (props) => {
  const {
    inputLabel,
    inputLabelClasses,
    value,
    onChange,
    rows,
    columns,
    name,
    className,
    style,
    ...rest
  } = props;
  const defautlNovelTextAreaProps = {
    "arial-value": value,
    "arial-label": name,
    rows: rows ? rows : 3,
    cols: columns ? columns : 12,
    name,
    value,
    ...rest,
  };
  const onTextAreaChange = (event) => {
    event.preventDefault();
    onChange && onChange(event);
  };
  return (
    <div className="novel-textarea-wrapper">
      <Label
        labelName={inputLabel}
        htmlFor={name}
        className={UIElementHelper.getllClasses(
          "novel-label--input",
          inputLabelClasses
        )}
      />
      <textarea
        className={UIElementHelper.getllClasses("novel-text-areas", className)}
        rows={rows}
        cols={columns}
        onChange={onTextAreaChange}
        value={value}
        style={style}
        {...defautlNovelTextAreaProps}
      />
    </div>
  );
};

export { NovelSuitesTextarea };
