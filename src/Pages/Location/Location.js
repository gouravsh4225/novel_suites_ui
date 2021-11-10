import React, { Fragment, useEffect, useState } from "react";
import WorkUnderProcess from "../../Components/WorkUnderProcess/WorkUnderProcess";
import NovelSuitesButton from "../../SharedComponents/UI_Elements/NovelSuitesButton/NovelSuitesButton";
import { getAllLocation } from "../../Services/Location/LocationService";
import "./Location.scss";
import NovelLoader from "../../SharedComponents/NovelLoader/NovelLoader";

const locationArray = () => {
  return [
    {
      id: 1,
      country_location: "Dwarka, Delhi",
      location_address:
        "Plot - 339, Block B, Sec - 19, Dwarka, New Delhi - 110075",
      contact_number: "+918383019368",
      contact_email: "novelsuites@gmail.com",
      location_address_imageurl:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
    },
  ];
};

const Location = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    getAllLocation()
      .then((res) => {
        console.log(res, "response in component");
        setLocationList(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const browserLocationRoomHandler = (e, location) => {
    console.log("e,-->", e, location);
  };
  const learnMoreLocationHandler = () => {
    console.log("hey--");
  };
  return (
    <Fragment>
      <NovelLoader isOpen={isLoading} />
      <div className="location-wrapper container">
        <div className="location-wrapper-title text-center">
          <h1 className="location-wrapper-heading">Locations</h1>
          <p className="location-para-text">
            Locations where you can enjoy our services.
          </p>
        </div>
        <article className="location-card grid-container grid-container-fill grid-gap-1">
          {locationList.map((locationItem) => (
            <div className="novel-card" key={locationItem.location_id}>
              <div className="novel-card-img-wrapper">
                <img
                  src={locationItem.location_address_imageurl}
                  className="location-image"
                  loading="lazy"
                  alt="location-address"
                />
              </div>
              <div className="novel-card-content p-1 location-card-content">
                <h2 className="location-title mb-1 mt-0">
                  {locationItem.location_short_address}
                </h2>
                <p className="location-address mb-1">
                  {locationItem.location_full_address}
                </p>
                <div
                  tabIndex="0"
                  className="mb-1 location-address text-decoration-none"
                >
                  <span>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </span>
                  <span className="ml-1">
                    {locationItem?.contact_details.phone_number}
                  </span>
                </div>
                <div
                  tabIndex="0"
                  className="mb-1 location-address text-decoration-none letter-spacing-3"
                >
                  <span>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <span className="ml-1">
                    {locationItem?.contact_details.email_address}
                  </span>
                </div>
                <div className="grid-container grid-gap-1 location-buttons">
                  <NovelSuitesButton
                    type="button"
                    className="novel-button--primary "
                    buttonLabel="Book A room"
                    onClick={() => browserLocationRoomHandler(locationItem)}
                  />
                  <NovelSuitesButton
                    type="button"
                    className="novel-button--secondary-text "
                    buttonLabel="Learn More"
                    onClick={() => learnMoreLocationHandler(locationItem)}
                  />
                </div>
              </div>
            </div>
          ))}
        </article>
        <WorkUnderProcess />
      </div>
    </Fragment>
  );
};

export default Location;
