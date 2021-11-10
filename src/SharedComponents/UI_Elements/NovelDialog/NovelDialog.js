import React, { Fragment, useRef } from "react";
import UIElementHelper from "../UI_Element_helpers";
import NovelBackDrop from "../NovelBackDrop/NovelBackDrop";
import "./NovelDialog.scss";
import { useState } from "react/cjs/react.development";
import OutSideClicked from "../../OutSideClicked/OutSideClicked";

const addAllCssClasses = (initialClass, propsClasses) => {
  return UIElementHelper.getllClasses(initialClass, propsClasses);
};

const NovelDialog = ({ children, isOpen, className, onClose, style }) => {
  return (
    <NovelBackDrop>
      <OutSideClicked onClikcedOutSide={onClose}>
        <div
          className={addAllCssClasses("novel__dialog-container", className)}
          style={style}
        >
          {children}
        </div>
      </OutSideClicked>
    </NovelBackDrop>
  );
};

const NovelDialogHeader = ({
  children,
  headerHeading,
  onCloseHandler,
  className,
  style,
}) => {
  return (
    <div
      className={addAllCssClasses("novel__dialog-header", className)}
      style={style}
    >
      {children ? (
        { children }
      ) : (
        <Fragment>
          <h4 className="novel__dialog-header-heading">{headerHeading}</h4>
          <div onClick={onCloseHandler} className="novel__dialog-header-close">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const NovelDialogFooter = ({ children, style }) => {
  return (
    <div className="novel__dialog-footer" style={style}>
      {children}
    </div>
  );
};

NovelDialog.DialogHeader = NovelDialogHeader;
NovelDialog.DialogFooter = NovelDialogFooter;

export default NovelDialog;
