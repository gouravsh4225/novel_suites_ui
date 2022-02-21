import React, { useMemo } from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelToggleSwitch.scss";

const NovelSwitchToggle = ({
  labelName,
  isToggled,
  onChange,
  labelFor,
  isRounded = false,
  className,
}) => {
  const onChangeTogglButtonHandler = (e) => {
    onChange && onChange(!isToggled);
  };

  const switchInnerClass = useMemo(() => {
    let allclass = "switch-inner";
    return isRounded ? `${allclass} rounded` : allclass;
  }, [isRounded]);

  const wrapperClasses = useMemo(() => {
    return UIElementHelper.getllClasses("novel-switch-wrapper", className);
  }, [className]);

  return (
    <div className={wrapperClasses}>
      <label className="switch-container">
        <input
          type="checkbox"
          className="switch-input"
          checked={isToggled}
          onChange={onChangeTogglButtonHandler}
          id={labelFor}
        />
        <span className={switchInnerClass}></span>
      </label>
      <label htmlFor={labelFor} className="switch-label">
        {labelName}
      </label>
    </div>
  );
};

export { NovelSwitchToggle };
