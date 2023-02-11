import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BackDrop } from "../UI_Library";
import OutSideClicked from "../../SharedComponents/OutSideClicked/OutSideClicked";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelMenu.scss";

const NOVEL_MENU_CONSTANT = {
  SPACING: 16,
  ITEM_MIN_LEFT: 80,
  ITEM_MAX_LEFT: 100,
  ITEM_MINUS_LEFT: 8,
  ITEM_WIDTH_DIVIDER: 1.5,
  MENU_MIN_WIDTH: 200,
};

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
  const menuListRef = useRef();
  const [menuListStyles, setmenuListStyles] = useState({
    x: 0,
    y: 0,
    width: 0,
  });

  const getClickedPostion = () => {
    const parentElementRect = getTargetPositions();
    if (targetElement) {
      let left =
        parentElementRect.left +
        (targetElement.offsetWidth - parentElementRect.width) / 2;
      let { width, top } = parentElementRect;
      let componentWidth =
        width > NOVEL_MENU_CONSTANT.MENU_MIN_WIDTH
          ? width
          : NOVEL_MENU_CONSTANT.MENU_MIN_WIDTH;
      return {
        top: `${top + NOVEL_MENU_CONSTANT.SPACING}`,
        left: `${left}`,
        width: `${componentWidth}`,
      };
    }
    return {};
  };

  const getTargetPositions = () => {
    if (targetElement) return targetElement.getBoundingClientRect();
    return;
  };

  useEffect(() => {
    let { top, left, width } = getClickedPostion();
    let { innerWidth, innerHeight } = window;
    let xTop = 0;
    let yTop = 0;
    if (targetElement) {
      let { x, y } = getTargetPositions();
      const menuListRect = menuListRef && menuListRef.current;
      let { offsetWidth } = menuListRect;
      if (x + offsetWidth >= innerWidth - offsetWidth) {
        x = x - 200;
      }
      /** To Do 
       * 
       *  // if (y > innerHeight / 2) {
      //   y = y - 200;
      // }
       */
      left = x;
      top = y;
    }
    if (isOpen) {
      UIElementHelper.addOverFlowYHiddenBody();
    }
    setmenuListStyles({
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      transform: `translate(${xTop} ${yTop})`,
    });

    return () => {
      UIElementHelper.removeOverFlowYHiddenBody();
    };
  }, [isOpen]);

  const NovelMenuWrapper = () => {
    return (
      <BackDrop className="bg-transparent">
        <OutSideClicked onClikcedOutSide={onClose}>
          <div
            className={`${getMenuAllClasses("novel-menu-wrapper", className)} ${
              isOpen ? "open" : ""
            }`}
            style={menuListStyles}
            ref={menuListRef}
          >
            {children}
          </div>
        </OutSideClicked>
      </BackDrop>
    );
  };
  if (isOpen) {
    return createPortal(<NovelMenuWrapper />, document.body);
  }
  return null;
};

NovelMenu.MenuItem = NovelMenuItem;

export { NovelMenu };
