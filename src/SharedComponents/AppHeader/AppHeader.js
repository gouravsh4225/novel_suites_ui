import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import NovelLogImage from "../../assets/logo_novel.gif";
import NovelSuitesButton from "../UI_Elements/NovelSuitesButton/NovelSuitesButton";
import AppHeaderNavList from "./AppHeaderNavList";
import AppHeaderSideBar from "./AppHeaderSideBar";
import { SHOW_HEADER_HEIGHT } from "../../Constants/constant";
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
  const [isSideBarMenuOpen, setIsSideBarMenuOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > SHOW_HEADER_HEIGHT) {
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

  const onNaviagtionListItem = (event, navigateClickedItem) => {
    if (isSideBarMenuOpen) {
      setIsSideBarMenuOpen(false);
    }
    navigateToPage(navigateClickedItem);
  };

  const getCurrentPath = () => {
    const { pathname } = routerLocation;
    let currentPathList = ["/about-us"];
    return currentPathList.includes(pathname) ? true : false;
  };

  const showSideBarMenu = () => {
    setIsSideBarMenuOpen(!isSideBarMenuOpen);
  };

  return (
    <header
      className={`appheader-wrapper container ${
        getCurrentPath() && `mblock-1`
      } ${isScrolled && "header-active"}`}
    >
      <div className="mobile-navigation">
        <div className="mobile-naviagtion-bars" onClick={showSideBarMenu}>
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className={`${isSideBarMenuOpen && "mobile-naviagtion-list"}`}>
          {isSideBarMenuOpen ? (
            <AppHeaderSideBar
              menuList={navigationMenu}
              onClickListItem={onNaviagtionListItem}
              onClikcedOutSide={showSideBarMenu}
            />
          ) : null}
        </div>
      </div>
      <a href="/">
        <img src={NovelLogImage} alt="novel_log" className="appheader-logo" />
      </a>
      <div className="ml-auto app-nav-list-container">
        <nav className="app-header-nav">
          <AppHeaderNavList
            navigationMenu={navigationMenu}
            onClick={onNaviagtionListItem}
          />
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
