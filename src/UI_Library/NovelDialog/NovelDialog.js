import React, { Fragment, useEffect, useCallback } from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelDialog.scss";

const addAllCssClasses = (initialClass, propsClasses) => {
  return UIElementHelper.getllClasses(initialClass, propsClasses);
};

const NovelDialog = ({
  children,
  isOpen,
  className,
  onEscKeyClose,
  style,
  isCenter = true,
}) => {
  const handelkeyDown = useCallback(
    (e) => {
      // key code 27 is used for escape
      if (e.keyCode === 27) {
        if (onEscKeyClose) {
          onEscKeyClose();
        } else {
          return;
        }
      }
    },
    [onEscKeyClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handelkeyDown);
    return () => window.removeEventListener("keydown", handelkeyDown);
  }, [isOpen, handelkeyDown]);

  if (isOpen) {
    return (
      <div
        className={addAllCssClasses("novel-suites-modal-root", className)}
        style={style}
      >
        <div className="novel-suites-modal-overlay">
          <div
            className={`novel-suites-modal-container ${
              isCenter ? "novel-suites-modal-containerCenter" : ""
            }`}
          >
            <div className="novel-suites-modal-modal">{children}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
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
      aria-label="novel-header"
    >
      {children ? (
        { children }
      ) : (
        <Fragment>
          <h3
            className="novel__dialog-header-heading"
            aria-label={headerHeading}
          >
            {headerHeading}
          </h3>
          <div
            onClick={onCloseHandler}
            className="novel__dialog-header-close"
            aria-label="modal-close"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const NovelDialogFooter = ({ children, style, className }) => {
  return (
    <div
      style={style}
      className={addAllCssClasses("novel__dialog-footer", className)}
    >
      {children}
    </div>
  );
};

const NovelDialogContent = ({ children, style, className }) => {
  return (
    <div
      className={addAllCssClasses("novel__dialog-content", className)}
      style={style}
    >
      {children}
    </div>
  );
};

NovelDialog.Header = NovelDialogHeader;
NovelDialog.Content = NovelDialogContent;
NovelDialog.Footer = NovelDialogFooter;

export { NovelDialog };
