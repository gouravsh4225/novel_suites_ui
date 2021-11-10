import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import NovelLogImage from "../../assets/logo_novel.gif";
import NovelSuitesButton from "../UI_Elements/NovelSuitesButton/NovelSuitesButton";
import NovelSuiteHeaderNavList from "./NovelSuiteHeaderNavList";
import NovelSuiteHeaderSideBar from "./NovelSuiteHeaderSideBar";
import { SHOW_HEADER_HEIGHT } from "../../Constants/constant";
import "./NovelSuiteHeader.scss";
import NovelSuiteMobileHeader from "./NovelSuiteMobileHeader";
import Login from "../../Pages/Login/Login";

const getNavigationMenu = () => {
  return [
    { label: "Home", navigationPageurl: "/", id: 1 },
    { label: "About Us", navigationPageurl: "/about-us", id: 2 },
    { label: "Location", navigationPageurl: "/location", id: 3 },
  ];
};

const NovelSuiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideBarMenuOpen, setIsSideBarMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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

  const showSideBarMenu = () => {
    setIsSideBarMenuOpen(!isSideBarMenuOpen);
  };

  const openLoginHandler = () => {
    setIsLoginOpen(true);
  };

  const closeLoginHandler = () => {
    setIsLoginOpen(false);
  };

  return (
    <Fragment>
      {isLoginOpen ? (
        <Login isOpen={isLoginOpen} onClose={() => closeLoginHandler()} />
      ) : null}
      <header
        className={`appheader-wrapper container  ${
          isScrolled && "header-active"
        }`}
      >
        <div className="mobile-navigation">
          <NovelSuiteMobileHeader
            onClick={showSideBarMenu}
            isSideBarMenuOpen={isSideBarMenuOpen}
          />
          <div className={`${isSideBarMenuOpen && "mobile-naviagtion-list"}`}>
            {isSideBarMenuOpen ? (
              <>
                <NovelSuiteHeaderSideBar
                  menuList={navigationMenu}
                  onClickListItem={onNaviagtionListItem}
                  onClikcedOutSide={showSideBarMenu}
                />
              </>
            ) : null}
          </div>
        </div>
        <a href="/" className="novel__logo">
          <img src={NovelLogImage} alt="novel_log" className="appheader-logo" />
          <span className="novel__logo--title">Novel Suites</span>
        </a>
        <div className="ml-auto app-nav-list-container">
          <nav className="app-header-nav">
            <NovelSuiteHeaderNavList
              navigationMenu={navigationMenu}
              onClick={onNaviagtionListItem}
            />
          </nav>
          <div>
            <NovelSuitesButton
              buttonLabel="Login"
              type="button"
              className="novel-button--secondary-text mr-1"
              onClick={() => openLoginHandler()}
            />
            <NovelSuitesButton
              type="button"
              className="novel-button--primary"
              buttonLabel="Book Room"
              onClick={() =>
                navigateToPage({
                  navigationPageurl: "/browse-rooms",
                })
              }
            />
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default NovelSuiteHeader;
