import React, { useCallback, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import UIElementHelper from "../../UI_Library/UI_Element_helpers";
import NovelBackDrop from "../NovelBackDrop/NovelBackDrop";
import "./NovelLoader.scss";

const NovelLoader = ({ isOpen, className }) => {
  const addAllLoaderCssClass = () => {
    return UIElementHelper.getllClasses(
      "novel-loader-container",
      isOpen ? "show-loader" : "",
      className
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, []);

  return (
    <React.Fragment>
      {isOpen ? (
        <NovelBackDrop style={{ zIndex: "10000" }}>
          <div className={addAllLoaderCssClass()} id="loader-id">
            <div className="loading"></div>
            <p className="loading-title">loading</p>
          </div>
        </NovelBackDrop>
      ) : null}
    </React.Fragment>
  );
};

const createNovelNodeElement = () => {
  return new Promise((resolve, reject) => {
    if (!document.getElementById("novel-loader")) {
      const createTag = document.createElement("div");
      createTag.setAttribute("id", `novel-loader`);
      document.body.appendChild(createTag);
      console.log("in cretad");
      return resolve(true);
    }
    return resolve(true);
  });
};

const NovelLoaderCreateElement = (isOpen, className) => {
  createNovelNodeElement().then((res) => {
    if (!res) return alert("some error while loading");
    ReactDOM.render(
      <NovelLoader isOpen={isOpen} className={className} />,
      document.getElementById(`novel-loader`)
    );
  });
};

const showLoader = (isOpen = "true", classNames) => {
  NovelLoaderCreateElement(isOpen, classNames);
};

const hideLoader = () => {
  const loaderElement = document.getElementById("novel-loader");
  document.body.classList.remove("overflow-y-hidden");
  if (loaderElement) return loaderElement.remove();
  return null;
};

NovelLoader.show = showLoader;
NovelLoader.hide = hideLoader;

export { NovelLoader };
