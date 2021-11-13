import React, { Fragment, useEffect } from "react";
import UIElementHelper from "../UI_Elements/UI_Element_helpers";
import "./NovelLoader.scss";

const NovelLoader = ({ isOpen, className }) => {
  const addScrollToBody = (status) => {
    const bodyElement = document.querySelector("body");
    if (status) {
      bodyElement.style.overflowY = "hidden";
    } else {
      bodyElement.style.overflowY = "scroll";
    }
  };

  const addAllLoaderCssClass = () => {
    return UIElementHelper.getllClasses(
      "novel-loader-container",
      isOpen ? "show-loader" : "",
      className
    );
  };

  useEffect(() => {
    const bodyScrollPreventHandler = (e) => {
      addScrollToBody(isOpen);
    };
    window.addEventListener("scroll", bodyScrollPreventHandler);
    return () => {
      addScrollToBody(false);
      window.removeEventListener("scroll", bodyScrollPreventHandler);
    };
  }, [isOpen]);

  return (
    <Fragment>
      {isOpen ? (
        <div className={addAllLoaderCssClass()}>
          <div className="loading"></div>
          <p className="loading-title">loading</p>
        </div>
      ) : null}
    </Fragment>
  );
};

export default NovelLoader;
