import React, { useState } from "react";
import WorkUnderProcess from "../../Components/WorkUnderProcess/WorkUnderProcess";
import NovelSuitesButton from "../../SharedComponents/UI_Elements/NovelSuitesButton/NovelSuitesButton";
import {
  loadRazorPayScript,
  RazorPayPaymentOptions,
} from "../../Utils/RazorPayUtils";
import "./NovelRooms.scss";

const getAllRooms = () => {
  return [
    {
      id: 1,
      roomTypelabel: "Premium Deluxe Room",
      roomTypeDesc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas neque tristique sapien enim .`,
      roomPrice: "3000.00",
      roomGuests: 4,
      kingBeds: 2,
      roomImageThumb:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
    },
    {
      id: 2,
      roomTypelabel: "Deluxe Room",
      roomTypeDesc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas neque tristique sapien enim .`,
      roomPrice: "2600.00",
      roomGuests: 4,
      kingBeds: 2,
      roomImageThumb:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
    },
    {
      id: 3,
      roomTypelabel: "Premium Room",
      roomTypeDesc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas neque tristique sapien enim .`,
      roomPrice: "2000.00",
      roomGuests: 2,
      kingBeds: 1,
      roomImageThumb:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
    },
    {
      id: 4,
      roomTypelabel: "Standard Room",
      roomTypeDesc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas neque tristique sapien enim .`,
      roomPrice: "1600.00",
      roomGuests: 2,
      kingBeds: 1,
      roomImageThumb:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
    },
  ];
};

const NovelRooms = () => {
  const [roomsList] = useState(getAllRooms());
  const onSeeMoreInformationHandler = (e, roomSelected) => {
    console.log("hey-->", roomSelected);
  };

  const onBookRoomHandler = (e, roomSelected) => {
    loadRazorPayScript().then((res) => {
      if (!res) {
        alert("RazorPay script SDK load to failed");
        return;
      }
      const paymentOptions = RazorPayPaymentOptions(
        (50 * 100).toString(),
        "INR",
        roomSelected.roomTypelabel,
        roomSelected.roomTypeDesc,
        "order_IJco9gAnzq38kI"
      );
      const razorpayPaymentObject = new window.Razorpay(paymentOptions);
      razorpayPaymentObject.open();
    });
  };
  return (
    <div className="novel-room-wrapper">
      <div className="container">
        <div className="novel-room-header text-center">
          <h3 className="novel-room-heading">Rooms and Suites</h3>
          <p className="novel-room--para">Find yourself a perfect room</p>
        </div>
        <div className="novel-rooms-lists">
          {roomsList.map((room, index) => (
            <div className="novel-room-item" key={room.id}>
              <div className="novel-room-item-image">
                <img
                  src={room.roomImageThumb}
                  alt={`novel-rooom-${room.roomTypelabel}`}
                />
              </div>
              <div className="novel-room-item-content">
                <div className="novel-room-hr"></div>
                <div className="novel-room-details">
                  <h3>{room.roomTypelabel}</h3>
                  <p>{room.roomTypeDesc}</p>
                </div>
                <div className="border-hr-line--gray mb-1 mt-1"></div>
                <div className="novel-room-prices">
                  <div className="novel-room-from">
                    <h6>From</h6>
                    <h4 className="from-price-text">
                      <span className="from-price-icon">
                        <i className="fa fa-inr" aria-hidden="true"></i>
                      </span>
                      <span>
                        {room.roomPrice}
                        <span className="from-price-per">/ night</span>
                      </span>
                    </h4>
                  </div>
                  <div className="novel-room-beds-guest">
                    <div className="novel-room-guests text-center">
                      <span>
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <div>{room.roomGuests}</div>
                        <div>Guests</div>
                      </span>
                    </div>
                    <div className="novel-room-beds text-center">
                      <span>
                        <i className="fa fa-bed" aria-hidden="true"></i>

                        <div>{room.kingBeds}</div>
                        <div>Beds</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-1 grid-container grid-gap-1 novel-rooms-buttons">
                  <NovelSuitesButton
                    buttonLabel="Book Now"
                    onClick={(e) => onBookRoomHandler(e, room)}
                    className="novel-button--primary "
                  />
                  <NovelSuitesButton
                    buttonLabel="More Information"
                    onClick={(e) => onSeeMoreInformationHandler(e, room)}
                    className="novel-button--secondary-text"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WorkUnderProcess />
    </div>
  );
};

export default NovelRooms;
