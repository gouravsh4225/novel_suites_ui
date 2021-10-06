import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import NovelLogImage from "../../assets/logo_novel.gif";
import NovelSuitesButton from "../UI_Elements/NovelSuitesButton/NovelSuitesButton";
import "./AppHeader.scss";

const getNavigationMenu = () => {
  return [
    { label: "Home", navigationPageurl: "/", id: 1 },
    { label: "About Us", navigationPageurl: "/about-us", id: 2 },
    { label: "Location", navigationPageurl: "/location", id: 3 },
  ];
};

const AppHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  const routerHistory = useHistory();
  const routerLocation = useLocation();
  const [navigationMenu] = useState(getNavigationMenu());

  const navigateToPage = (selecteditem) => {
    routerHistory.push({
      pathname: selecteditem.navigationPageurl,
    });
  };

  const getCurrentPath = () => {
    const { pathname } = routerLocation;
    let currentPathList = ["/about-us"];
    return currentPathList.includes(pathname) ? true : false;
  };

  return (
    <header
      className={`appheader-wrapper container ${
        getCurrentPath() && `mblock-1`
      } ${isScrolled && "header-active"}`}
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
        <NovelSuitesButton
          type="button"
          className="novel-button--primary ml-auto"
          buttonLabel="Browse room"
          onClick={() =>
            navigateToPage({
              navigationPageurl: "/browse-room",
            })
          }
        />
      </div>
    </header>
  );
};

export default AppHeader;
