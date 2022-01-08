import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import NovelLogImage from "../../assets/logo_novel.gif";
import { Button } from "../../UI_Library/UI_Library";
import NovelSuiteHeaderNavList from "./NovelSuiteHeaderNavList";
import NovelSuiteHeaderSideBar from "./NovelSuiteHeaderSideBar";
import { SHOW_HEADER_HEIGHT } from "../../Constants/constant";
import NovelSuiteMobileHeader from "./NovelSuiteMobileHeader";
import Login from "../../Pages/Login/Login";
import BookNow from "../../Components/BookNow/BookNow";
import UserProfile from "../../Components/UserProfile/UserProfile";
import "./NovelSuiteHeader.scss";
import CommonUtlis from "../../Utils/CommonUtlis";

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
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
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

  const closeBookNowHandler = () => {
    setIsBookNowOpen(false);
  };

  const checkForUserLogedData = () => {
    let fetchLogedData = CommonUtlis.getSessionUserDetails();
    if (fetchLogedData) {
      return <UserProfile />;
    } else {
      return (
        <Button
          buttonLabel="Login"
          type="button"
          className="novel-button--secondary-text mr-1"
          onClick={() => openLoginHandler()}
        />
      );
    }
  };

  return (
    <Fragment>
      <Login isOpen={isLoginOpen} onClose={() => closeLoginHandler()} />
      <BookNow isOpen={isBookNowOpen} onClose={() => closeBookNowHandler()} />

      <header
        className={`appheader-wrapper fluid-container  ${
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
          <NovelSuiteHeaderNavList
            navigationMenu={navigationMenu}
            onClick={onNaviagtionListItem}
          />
          <div className="d-flex flex-align-center">
            <Button
              type="button"
              className="novel-button--primary mr-1"
              buttonLabel="Book Room"
              onClick={() => setIsBookNowOpen(true)}
            />
            {checkForUserLogedData()}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default NovelSuiteHeader;
