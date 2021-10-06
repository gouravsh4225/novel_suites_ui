import React from "react";
import NovelLogImage from "../../assets/logo_novel_png.png";
import "./NovelFooter.scss";

const NovelFooter = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-upper">
          <div className="footer-logo-section">
            <a href="/" className="footer-logo-wrapper">
              <img src={NovelLogImage} className="footer-logo" />
            </a>
            <p className="footer-logo-title">
              Enjoy today in our luxury suites
            </p>
          </div>
          <div className="footer-follow-section"></div>
        </div>
      </div>
    </footer>
  );
};

export default NovelFooter;
