import React from "react";
import "./ContactUs.scss";

const ContactUs = () => {
  return (
    <div className="contact-us-wrapper">
      <section className="contact-us-banner">
        <div className="container">
          <div className="contact-banner-heading">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a,
              tempus, sit euismod aliquet nec, at.
            </p>
          </div>
        </div>
        <section className="contact-us-layout">
          <div className="container pt-1">
            <div className="border-hr-line"></div>
            <div className="contact-layout p-1">
              <section className="contact-card">
                <div className="contact-card-icon">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                </div>
                <div className="contact-card-content">
                  <p>PLOT - 339, BLOCK B, SEC - 19, DWARKA,</p>
                  <p>NEW DELHI - 110075</p>
                </div>
              </section>
              <section className="contact-card">
                <div className="contact-card-icon">
                  <i class="fa fa-phone" aria-hidden="true"></i>
                </div>
                <div className="contact-card-content">
                  <a href="+918383019368" className="text-decoration-none">
                    +918383019368
                  </a>
                </div>
              </section>
              <section className="contact-card">
                <div className="contact-card-icon">
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </div>
                <div className="contact-card-content">
                  <a
                    href="mailto:novelsuites@gmail.com"
                    className="text-decoration-none"
                  >
                    novelsuites@gmail.com
                  </a>
                </div>
              </section>
            </div>
          </div>
        </section>
      </section>
      <section className="contact-form-section"></section>
    </div>
  );
};

export default ContactUs;
