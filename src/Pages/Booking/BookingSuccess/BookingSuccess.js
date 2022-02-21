import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "../../../UI_Library/UI_Library";
import "./BookingSuccess.scss";

const BookingSuccess = () => {
  const router = useHistory();
  const navigateToAllBooking = () => {
    router.push("/user-bookings");
  };

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <div className="container d-flex flex-align-center flex-justify-center">
      <Card className="booking-success-card mt-1">
        <Card.Content>
          <div className="d-flex flex-align-center fs-textXl pblock-1 text-success-color text-capitalize text-center">
            <i className="fa fa-check" aria-hidden="true"></i>
            <p className="ml-5px fw-normal">Your booking is created now</p>
          </div>
          <div className="booking-details fs-textMd">
            Booking Details will come here
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="d-flex flex-wrap flex-align-center flex-justify-space-between">
            <Button className="novel-button--primary" onClick={navigateToHome}>
              Book another Room
            </Button>
            <Button
              className="novel-button--secondary-text"
              onClick={navigateToAllBooking}
            >
              Redirect Now
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
export default BookingSuccess;
