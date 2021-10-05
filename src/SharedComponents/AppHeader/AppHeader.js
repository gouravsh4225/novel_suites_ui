import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import NovelLogImage from "../../assets/logo_novel.gif";
import "./AppHeader.scss";

const getNavigationMenu = () => {
  return [
    { label: "Home", navigationPageurl: "/", id: 1 },
    { label: "About Us", navigationPageurl: "/about-us", id: 2 },
    { label: "Location", navigationPageurl: "/location", id: 3 },
  ];
};

const AppHeader = () => {
  const routerHistory = useHistory();
  const routerLocation = useLocation();
  const [navigationMenu, setNavigation] = useState(getNavigationMenu());

  const navigateToPage = (selecteditem) => {
    routerHistory.push({
      pathname: selecteditem.navigationPageurl,
    });
  };
  const isAboutPageLoaded = () => {
    const { pathname } = routerLocation;
    return pathname === "/about-us" ? true : false;
  };
  return (
    <header
      className={`appheader-wrapper container ${
        isAboutPageLoaded() ? `mblock-1` : ""
      }`}
    >
      <a href="/">
        <img src={NovelLogImage} alt="novel_log" className="appheader-logo" />
      </a>
      <div className="ml-auto app-nav-list-container">
        <nav className="app-header-nav">
          <ul className="app-header-lists">
            {navigationMenu.map((navigationItem) => (
              <li className="app-header-items" key={navigationItem.id}>
                <div
                  className="app-header-links"
                  aria-label={navigationItem.label}
                  onClick={() => navigateToPage(navigationItem)}
                >
                  {navigationItem.label}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="button button-primary ml-auto"
          type="button"
          onClick={() =>
            navigateToPage({
              navigationPageurl: "/browse-room",
            })
          }
        >
          Browse room
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
