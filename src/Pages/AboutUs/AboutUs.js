import React from "react";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="aboutus-wrapper container">
      <div className="aboutus-home-image">
        <img
          src="https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg"
          loading="lazy"
          alt="about-bg-logo"
        />
      </div>
      <section className="abouts-card-container">
        <div className="novel-card text-center">
          <h1 className="novel-card-heading">About Us</h1>
          <div className="novel-card-content">
            Novel Suites is located in the heart of Dwarka and an extremely
            characteristic, quite and lively area within the short walk distance
            to market, restaurant, park and Metro station. Place is surrounded
            by beautiful garden. Each detail has been passionately chosen and
            each room deserves a visit.
          </div>
          <h3>
            Address:8383019368 novelsuites@gmail.com Plot - 339, Block B, Sec -
            19, Dwarka, New Delhi - 110075
          </h3>
          <div className="nove-card-footer"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
