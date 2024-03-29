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
              <img
                src={NovelLogImage}
                className="footer-logo"
                alt="novel-footer"
              />
            </a>
            <p className="footer-logo-title">
              Enjoy today in our luxury suites
            </p>
          </div>
          <div className="footer-follow-section">
            <div className="follow-container">
              <p className="follow-title">Follow Us</p>
              <div className="follow-social-icons">
                <a
                  href="https://facebook.com/"
                  alt="social-icon-facebook"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-item text-decoration-none"
                >
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a
                  href="https://twitter.com/"
                  alt="social-icon-twitter"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-item text-decoration-none"
                >
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  alt="social-icon-instagram"
                  rel="noreferrer"
                  className="social-icon-item text-decoration-none"
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-hr-line mblock-1"></div>
        <section className="footer-service-contact">
          <div className="service">
            <h2 className="footer-service-heading">Services</h2>
            <ul className="footer-service-lists">
              <li className="footer-service-items">About</li>
              <li className="footer-service-items">Locations</li>
              <li className="footer-service-items">Browse Room</li>
            </ul>
          </div>
          <div className="contact-us">
            <h2 className="footer-service-heading">Contact Us</h2>
            <ul className="footer-service-lists">
              <li className="footer-service-item">
                <div className="contact-us-address">
                  PLOT - 339, BLOCK B, SEC - 19, DWARKA, NEW DELHI - 110075
                </div>
              </li>
              <li className="footer-service-items">
                <div className="contact-us-tel">
                  <a href="+918383019368" className="text-decoration-none">
                    +918383019368
                  </a>
                </div>
              </li>
              <li className="footer-service-items">
                <div className="contact-us-tel">
                  <a
                    href="mailto:novelsuites@gmail.com"
                    className="text-decoration-none"
                  >
                    novelsuites@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default NovelFooter;
