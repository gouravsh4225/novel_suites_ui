import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../UI_Library/UI_Library";
import "./Location.scss";

const LocationCard = ({ locationList }) => {
  const locationHistory = useHistory();
  const browserLocationRoomHandler = (e, location) => {
    let roomUrl = `/location/${location._id}/rooms`;
    locationHistory.push(roomUrl);
  };
  const learnMoreLocationHandler = () => {
    console.log("hey--");
  };
  return (
    <Fragment>
      {locationList.map((locationItem) => (
        <div className="novel-card" key={locationItem._id}>
          <div className="novel-card-img-wrapper">
            <img
              src={locationItem.address_imageurl}
              className="location-image"
              loading="lazy"
              alt="location-address"
            />
          </div>
          <div className="novel-card-content p-1 location-card-content">
            <h2 className="location-title mb-1 mt-0">
              {locationItem.short_address}
            </h2>
            <p className="location-address mb-1">{locationItem.full_address}</p>
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
              <Button
                type="button"
                className="novel-button--primary "
                buttonLabel="Book A room"
                onClick={(e) => browserLocationRoomHandler(e, locationItem)}
              />
              <Button
                type="button"
                className="novel-button--secondary-text "
                buttonLabel="Learn More"
                onClick={(e) => learnMoreLocationHandler(e, locationItem)}
              />
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default LocationCard;
