import React, { useState, useEffect } from "react";
import { Loader } from "../../../UI_Library/UI_Library";
import NovelSkeleton from "../../../SharedComponents/NovelSkeleton/NovelSkeleton";
import AuthService from "../../../Services/AuthService/AuthService";
import "./UserBooking.scss";

const UserBookingCardLoading = () => {
  return [1, 2, 3, 4].map((item) => (
    <NovelSkeleton.Card key={item}>
      <NovelSkeleton.SquareImage />
      <NovelSkeleton.HalfHeading />
      <NovelSkeleton.FullHeading />
    </NovelSkeleton.Card>
  ));
};

const UserBooking = () => {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    console.log("hey effect");
    Loader.show();
    AuthService.getUserBookings()
      .then((res) => {
        Loader.hide();
        const { response } = res;
        if (response.data && Array.isArray(response.data)) {
          setUserBookings(response.data);
        }
      })
      .catch((error) => {
        Loader.hide();
        console.log(error, "errro in booking list");
      });
  }, []);

  return (
    <>
      <section className="user-booking-wrapper">
        <div className="container mt-1">
          <div className="m-auto" style={{ maxWidth: "80%" }}>
            {UserBookingCardLoading()}
            {userBookings.map((bookingItem) => {
              let { cart_details } = bookingItem;
              return (
                <div className="user-booking-item" key={bookingItem._id}>
                  {cart_details.map((cart_item) => (
                    <article
                      className="no-box-shadow user-card-border novel-card mt-1"
                      style={{ border: "1px solid #eaeaec" }}
                    >
                      Card
                    </article>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default UserBooking;
