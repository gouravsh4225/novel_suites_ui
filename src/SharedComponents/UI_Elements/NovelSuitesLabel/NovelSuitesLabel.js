import React from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelSuitesLabel.scss";

const NovelSuitesLabel = (props) => {
  const { labelName, children, type, className, style, htmlFor, ...rest } =
    props;

  const getAllLabelClass = () => {
    const typeClass = type ? getLabelType() : "";
    return UIElementHelper.getllClasses("novel-label", typeClass, className);
  };

  /**
   * @function getLabelType
   * @returns class which match type value in props
   */
  const getLabelType = () => {
    if (type) {
      if (type === "success") return "novel-label--success";
      if (type === "warning") return "novel-label--warning";
      if (type === "error") return "novel-label--error";
      if (type === "info") return "novel-label--info";
    }
    return "novel-label-default";
  };

  return (
    <label
      className={getAllLabelClass()}
      style={style}
      {...rest}
      htmlFor={htmlFor}
    >
      {labelName}
      {children ? children : ""}
    </label>
  );
};

export default NovelSuitesLabel;
