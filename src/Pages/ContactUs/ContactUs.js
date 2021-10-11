import React, { useState } from "react";
import NovelSuitesInput from "../../SharedComponents/UI_Elements/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesLabel from "../../SharedComponents/UI_Elements/NovelSuitesLabel/NovelSuitesLabel";
import "./ContactUs.scss";

const ContactUs = () => {
  const [contactUsForm, setContactUsForm] = useState({
    name: {
      value: "",
      errorText: "",
    },
    email: {
      value: "",
      errorText: "",
    },
  });
  const [name, setName] = useState("");
  const onChangeName = (event) => {
    const { name } = contactUsForm;
    const eventValue = event.target.value;
    name.value = eventValue;
    if (eventValue === "") {
      name.errorText = "This field is required";
    } else {
      name.errorText = "";
    }
    setContactUsForm({
      ...contactUsForm,
      name,
    });
  };
  const onChangeEmail = (event) => {
    const { email } = contactUsForm;
    const eventValue = event.target.value;
    email.value = eventValue;
    if (eventValue === "") {
      email.errorText = "This field is required";
    } else {
      email.errorText = "";
    }
    setContactUsForm({
      ...contactUsForm,
      email,
    });
  };

  const onContactFormSubmit = (event) => {
    event.preventDefault();
    console.log("hey--> sunbmite");
  };

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
                <form
                  className="form-inputs"
                  id="form-inputs"
                  onSubmit={onContactFormSubmit}
                >
                  <div className="form-input mb-1">
                    <NovelSuitesInput
                      inputLabel="Your Name :"
                      inputLabelClasses="contact-label"
                      validatior={["isRequires"]}
                      errorText={contactUsForm.name.errorText}
                      name="your_name"
                      onChange={(e) => onChangeName(e, "name")}
                      value={contactUsForm.name.value}
                    />
                  </div>
                  <div className="form-input mb-1">
                    <NovelSuitesInput
                      inputLabel="Your Email :"
                      inputLabelClasses="contact-label"
                      validatior={["isRequires"]}
                      errorText={contactUsForm.email.errorText}
                      name="your_name"
                      onChange={(e) => onChangeEmail(e, "email")}
                      value={contactUsForm.email.value}
                    />
                  </div>
                </form>
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
