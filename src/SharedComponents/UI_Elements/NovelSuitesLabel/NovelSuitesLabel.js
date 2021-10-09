import React from "react";
import "./NovelSuitesLabel.scss";

const NovelSuitesLabel = (props) => {
  const { labelName, children, type, className, style } = props;

  /**
   *
   * @function getAllLabelClass
   * @returns normal classs and other classes into one string
   */

  const getAllLabelClass = () => {
    const typeClass = type ? getLabelType() : "";
    return ["novel-label", typeClass, className].join(" ");
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
    <label className={getAllLabelClass()} style={style}>
      {labelName}
      {children ? children : ""}
    </label>
  );
};

export default NovelSuitesLabel;
