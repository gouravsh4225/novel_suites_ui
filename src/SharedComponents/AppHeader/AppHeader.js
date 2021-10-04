import React from "react";
import NovelLogImage from "../../assets/logo_novel.gif";
import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <header className="appheader-wrapper container">
      <a href="/">
        <img src={NovelLogImage} alt="novel_log" className="appheader-logo" />
      </a>
      <div className="ml-auto app-nav-list-container">
        <nav className="app-header-nav">
          <ul className="app-header-lists">
            <li className="app-header-items">
              <a href="/" className="app-header-link">
                Home
              </a>
            </li>
            <li className="app-header-items">
              <a href="/" className="app-header-link">
                About
              </a>
            </li>
            <li className="app-header-items">
              <a href="/" className="app-header-link">
                Location
              </a>
            </li>
          </ul>
        </nav>
        <button className="btn btn-primary ml-auto">Browse room</button>
      </div>
    </header>
  );
};

export default AppHeader;
