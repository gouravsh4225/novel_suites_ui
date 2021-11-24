import React, { Fragment, useState, useEffect } from "react";
import NovelDialog from "../../UI_Library/NovelDialog/NovelDialog";
import NovelDropdown from "../../UI_Library/NovelDropdown/NovelDropdown";
import { getAllLocation } from "../../Services/Location/LocationService";
import "./BookNow.scss";

const getAllLocationData = () => {
  return [
    {
      location_id: 1,
      location_hotel_name: "Novel Suites",
      location_short_address: "DWARKA, DELHI",
      location_full_address:
        "PLOT - 339, BLOCK B, SEC - 19, DWARKA, NEW DELHI - 110075",
      contact_details: {
        email_address: "novelsuites@gmail.com",
        phone_number: "+918383019368",
      },
      location_address_imageurl:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
      location_room_type: [
        {
          type: "Deluxe",
          facilities: [],
          price: 2000,
          no_of_rooms: 10,
          id: "22",
        },
      ],
    },
    {
      location_id: 2,
      location_hotel_name: "Novel Suites",
      location_short_address: "KARNAL, Harayan",
      location_full_address:
        "PLOT - 339, BLOCK B, SEC - 19, DWARKA, NEW DELHI - 110075",
      contact_details: {
        email_address: "novelsuites@gmail.com",
        phone_number: "+918383019368",
      },
      location_address_imageurl:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
      location_room_type: [
        {
          type: "Deluxe",
          facilities: [],
          price: 2000,
          no_of_rooms: 10,
          id: "22",
        },
      ],
    },
  ];
};

const BookNow = ({ isOpen, onClose }) => {
  const [locationList, setLocationList] = useState(getAllLocationData());
  const [selectedLocation, setSelectedLocation] = useState("");
  useEffect(() => {
    if (isOpen) {
      // getAllLocationDetails();
    }
  }, [isOpen]);

  const getAllLocationDetails = () => {
    getAllLocation()
      .then((res) => {
        setLocationList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onBookNowSubmit = (event) => {
    event.preventDefault();
  };

  const onChangeLocation = (value) => {
    console.log(value, "value in component");
    setSelectedLocation(value);
  };

  return (
    <Fragment>
      <NovelDialog onEscKeyClose={onClose} isOpen={isOpen}>
        <NovelDialog.Header headerHeading="Book Now" onCloseHandler={onClose} />
        <NovelDialog.Content>
          <div className="book-container">
            <form onSubmit={onBookNowSubmit}>
              <NovelDropdown
                items={locationList}
                value={selectedLocation}
                placeholder="Please select one"
                label="Location"
                keyId="location_id"
                keyValue="location_short_address"
                keyLabel="location_short_address"
                onChange={onChangeLocation}
              />
            </form>
          </div>
        </NovelDialog.Content>
      </NovelDialog>
    </Fragment>
  );
};

export default BookNow;
