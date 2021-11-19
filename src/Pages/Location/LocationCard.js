import React, { Fragment } from "react";
import NovelSuitesButton from "../../SharedComponents/UI_Elements/NovelSuitesButton/NovelSuitesButton";

import "./Location.scss";

const LocationCard = ({ locationList }) => {
  const browserLocationRoomHandler = (e, location) => {
    console.log("e,-->", e, location);
  };
  const learnMoreLocationHandler = () => {
    console.log("hey--");
  };
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default LocationCard;
