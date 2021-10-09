import React from "react";
import NovelSuitesInput from "../../SharedComponents/UI_Elements/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesLabel from "../../SharedComponents/UI_Elements/NovelSuitesLabel/NovelSuitesLabel";
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
            <div className="border-hr-line--gray"></div>
            <div className="contact-layout">
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
                  <a href="tel:+918383019368" className="text-decoration-none">
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
      <section className="contact-form-section">
        <div className="section-form">
          <div className="container">
            <div className="contact-form-heading">
              <h2 className="get_in_touch-heading">Get in touch today</h2>
              <p className="contact-sub-heading">
                Please send your query with these little form
              </p>
              <div className="form-card">
                <div className="form-inputs">
                  <div className="form-input mb-1">
                    <NovelSuitesLabel
                      labelName="Your Name :"
                      className="novel-label--input contact-label"
                    />
                    <NovelSuitesInput />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-image-wrapper">
          <img
            src="https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg"
            className="section-image"
            alt="form-section"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
