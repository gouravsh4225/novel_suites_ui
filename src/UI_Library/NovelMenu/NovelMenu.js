import React, { useCallback } from "react";
import OutSideClicked from "../../SharedComponents/OutSideClicked/OutSideClicked";
import NovelBackDrop from "../NovelBackDrop/NovelBackDrop";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelMenu.scss";

const getMenuAllClasses = (initialClass, className) => {
  return UIElementHelper.getllClasses(initialClass, className);
};

/** Novel Menu Item start here */
const NovelMenuItem = ({ className, children, onClickItem }) => {
  const onClickMenuItem = (e) => {
    e.preventDefault();
    onClickItem && onClickItem(e, children);
  };
  return (
    <div
      className={getMenuAllClasses("novel-menu-item", className)}
      onClick={onClickMenuItem}
    >
      {children}
    </div>
  );
};
/** Novel Menu Item end here */

const NovelMenu = ({ className, targetElement, onClose, children, isOpen }) => {
  const getClickedPostion = () => {
    let parentElement = targetElement
      ? targetElement.getBoundingClientRect()
      : "";
    if (parentElement) {
      return {
        top: `${parentElement.top}px`,
        left: `${parentElement.left}px`,
        right: `${parentElement.right}px`,
        minWidth: "200px",
      };
    }
    return {};
  };

  if (isOpen) {
    return (
      <NovelBackDrop style={{ backgroundColor: "transparent" }}>
        <OutSideClicked onClikcedOutSide={onClose}>
          <div
            className={`${getMenuAllClasses("novel-menu-wrapper", className)} ${
              isOpen ? "open" : ""
            }`}
            style={getClickedPostion()}
          >
            {children}
          </div>
        </OutSideClicked>
      </NovelBackDrop>
    );
  }
  return null;
};

NovelMenu.MenuItem = NovelMenuItem;

export default NovelMenu;
