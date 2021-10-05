import React, { useState } from "react";
import NovelSuitesButton from "../../SharedComponents/UI_Elements/NovelSuitesButton/NovelSuitesButton";
import "./Location.scss";

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
  const [locationList] = useState(locationArray());
  return (
    <div className="location-wrapper container">
      <div className="location-wrapper-title text-center">
        <h1 className="location-wrapper-heading">Locations</h1>
        <p className="location-para-text">
          Locations where you can enjoy our services.
        </p>
      </div>
      <article className="location-card grid-container grid-container-fill grid-gap-1">
        {locationList.map((locationItem) => (
          <div className="novel-card" key={locationItem.id}>
            <div className="novel-card-img-wrapper">
              <img
                src={locationItem.location_address_imageurl}
                className="location-image"
                loading="lazy"
                alt="location-image"
              />
            </div>
            <div className="novel-card-content p-1 location-card-content">
              <h2 className="location-title mb-1 mt-0">
                {locationItem.country_location}
              </h2>
              <p className="location-address mb-1">
                {locationItem.location_address}
              </p>
              <a
                href={`tel:${locationItem.contact_number}`}
                className="mb-1 location-address text-decoration-none"
              >
                {locationItem.contact_number}
              </a>
              <a
                href={`mailto:${locationItem.contact_email}`}
                className="mb-1 location-address text-decoration-none letter-spacing-3"
              >
                {locationItem.contact_email}
              </a>
              <NovelSuitesButton
                type="button"
                className="novel-button--secondary-text mblock-1"
                buttonLabel="Learn More"
              />
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default Location;
