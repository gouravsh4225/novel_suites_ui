import React from "react";
import { useHistory } from "react-router";
import NovelSuitesButton from "../../SharedComponents/UI_Elements/NovelSuitesButton/NovelSuitesButton";
import "./Home.scss";

const Home = () => {
  const homeHistory = useHistory();

  const navigateToPage = (link) => {
    homeHistory.push({
      pathname: link,
    });
  };

  return (
    <div className="home-page-wrapper">
      <section className="home-page-banner">
        <div className="container">
          <div className="home-page-banner-left">
            <h1 className="home-heading-1">Enjoy today in our luxury suites</h1>
            <p className="home-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a,
              tempus, sit euismod aliquet nec, at. Eu, mi a neque viverra
              vulputate amet, porttitor sagittis. Ut odio sit sit congue.
            </p>
            <section className="home-page-buttons">
              <NovelSuitesButton
                buttonLabel="Browse Rooms"
                className="novel-button--primary mr-1 novel-button--large"
                onClick={(e) => navigateToPage("/browse-rooms")}
              />
              <NovelSuitesButton
                buttonLabel="Contact"
                className="novel-button--secondary-text novel-button--large"
                onClick={(e) => navigateToPage("/contact-us")}
              />
            </section>
          </div>
        </div>
        <div className="home-page-banner-right">
          <img
            src="https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg"
            alt="home-page-banner"
            className="home-page-banner-image"
          />
        </div>
      </section>
      <section className="home-page-about">
        <div className="home-page-about-wrapper mt-1">
          <div className="novel-card">
            <div className="novel-card-content text-center">
              <h3>Visit our natural paradise and reconnect with yourself</h3>
              <p className="mt-1">
                The pain itself is love, the main customer And the time is wise
                to pay for the mass of the kids. Or the immune system will be
                born tomorrow to suspend the players. I put a lot of chocolate
                on my lion. Adipiscing purus dictum lacus sed. I haven't
                graduated at the weekend.
              </p>
              <NovelSuitesButton
                buttonLabel="explore more"
                className="novel-button--secondary-text mt-1"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
