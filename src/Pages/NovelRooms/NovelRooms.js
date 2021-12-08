import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import WorkUnderProcess from "../../Components/WorkUnderProcess/WorkUnderProcess";
import NovelSuitesButton from "../../UI_Library/NovelSuitesButton/NovelSuitesButton";
import {
  getRoomBookRazorPayOrderId,
  getAllRoomByLocation,
  confirmRazorPaymemtSuccess,
} from "../../Services/NovelRoomService/NovelRoomService";
import CommonUtlis from "../../Utils/CommonUtlis";
import {
  loadRazorPayScript,
  RazorPayPaymentOptions,
} from "../../Utils/RazorPayUtils";
import { NovelLoader } from "../../UI_Library/NovelLoader/NovelLoader";
import "./NovelRooms.scss";

const NovelRooms = () => {
  const { locationId } = useParams();
  const NovelRoomsHistory = useHistory();
  const [roomsList, setRoomList] = useState([]);

  useEffect(() => {
    getAllRoomByLocationId();
  }, []);

  const getAllRoomByLocationId = () => {
    NovelLoader.show();
    getAllRoomByLocation(locationId)
      .then((roomsResponeData) => {
        NovelLoader.hide();
        let { data } = roomsResponeData.response;
        let { rooms } = data[0];
        if (Array.isArray(rooms)) {
          setRoomList(rooms);
        }
      })
      .catch((roomsResponeError) => {
        NovelLoader.hide();
        console.log(roomsResponeError);
      });
  };

  const onSeeMoreInformationHandler = (e, roomSelected) => {
    console.log("hey-->", roomSelected);
  };

  const onBookRoomHandler = (e, roomSelected) => {
    loadRazorPayScript().then((res) => {
      if (!res) {
        alert("RazorPay script SDK load to failed");
        return;
      }
      let sessionUserData = JSON.parse(CommonUtlis.getSessionUserDetails());
      let prefill = {
        name: sessionUserData.name,
        email: sessionUserData.email_address,
        contact: sessionUserData.phone_number,
      };
      getRoomBookRazorPayOrderId()
        .then((res) => {
          let { data } = res.response;
          const razorPayoptions = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount.toString(),
            currency: data.currency,
            name: roomSelected.room_name,
            description: roomSelected.description,
            prefill: prefill,
            order_id: data.id,
            image:
              "https://novel-suites-ui.vercel.app/static/media/logo_novel.78ee88e9.gif",
            handler: (res) => {
              let {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              } = res;

              NovelLoader.show();
              confirmRazorPaymemtSuccess({
                orderCreationId: data.id,
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id,
                razorpaySignature: razorpay_signature,
              })
                .then((res) => {
                  NovelLoader.hide();
                  if (res) {
                    console.log("gotcha-->");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  NovelLoader.hide();
                });
            },
          };

          const razorpayPaymentObject = new window.Razorpay(razorPayoptions);
          razorpayPaymentObject.open();
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  };

  const onBookDetailsHandler = (e, room) => {
    NovelRoomsHistory.push(`/location/${locationId}/rooms/${room._id}`);
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
            <div
              className="novel-room-item"
              key={room._id}
              onClick={(e) => onBookDetailsHandler(e, room)}
            >
              <div className="novel-room-item-image">
                <img
                  src={
                    "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg"
                  }
                  alt={`novel-rooom-${room.room_name}`}
                />
              </div>
              <div className="novel-room-item-content">
                <div className="novel-room-hr"></div>
                <div className="novel-room-details">
                  <h3>{room.room_name}</h3>
                  <p>{room.room_description}</p>
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
                        {room.room_price}
                        <span className="from-price-per">/ night</span>
                      </span>
                    </h4>
                  </div>
                  <div className="novel-room-beds-guest">
                    <div className="novel-room-guests text-center">
                      <span>
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <div>{room.allowed_gustes}</div>
                        <div>Guests</div>
                      </span>
                    </div>
                    <div className="novel-room-beds text-center">
                      <span>
                        <i className="fa fa-bed" aria-hidden="true"></i>

                        <div>{room.total_beds}</div>
                        <div>Beds</div>
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-1 grid-container grid-gap-1 novel-rooms-buttons">
                  <NovelSuitesButton
                    buttonLabel="Check Book"
                    onClick={(e) => onBookRoomHandler(e, room)}
                    className="novel-button--primary "
                  />
                  <NovelSuitesButton
                    buttonLabel="More Information"
                    onClick={(e) => onSeeMoreInformationHandler(e, room)}
                    className="novel-button--secondary-text"
                  />
                </div> */}
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
