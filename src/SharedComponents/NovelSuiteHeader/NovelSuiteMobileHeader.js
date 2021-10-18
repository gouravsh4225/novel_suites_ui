import React from "react";

const NovelSuiteMobileHeader = ({ onClick, isSideBarMenuOpen }) => {
  const showSideBarMenu = (event) => {
    event.preventDefault();
    onClick && onClick();
  };
  return (
    <div className="mobile-naviagtion-bars" onClick={(e) => showSideBarMenu(e)}>
      {isSideBarMenuOpen ? (
        <i className="fa fa-close" aria-hidden="true"></i>
      ) : (
        <i class="fa fa-bars" aria-hidden="true"></i>
      )}
    </div>
  );
};

export default NovelSuiteMobileHeader;
