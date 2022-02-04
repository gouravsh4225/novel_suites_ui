import React, { useEffect, useState } from "react";
import { Label, Input, Button, Menu } from "../../../UI_Library/UI_Library";
import CommonUtlis from "../../../Utils/CommonUtlis";
import {
  dateFormatYearMonthDate,
  addDayInDate,
} from "../../../Utils/FormValidationUtlis";

const NovelRoomReverseForm = ({ selectedLocation, room }) => {
  const [menutarget, setMenuTarget] = useState(null);
  const [reserveRoomForm, setReserveRoomForm] = useState({
    check_in: {
      value: dateFormatYearMonthDate(new Date()).toString(),
      errorText: "",
    },
    check_out: {
      value: dateFormatYearMonthDate(addDayInDate(new Date(), 1)),
      errorText: "",
    },
    total_night: {
      value: 0,
    },
    total_guests: {
      value: 1,
    },
    total_price: {
      value: 1000,
    },
  });

  useEffect(() => {
    const { total_night, check_in, check_out, total_price } = reserveRoomForm;
    const intialNight = CommonUtlis.dayBetweenTwoDates(
      check_out.value,
      check_in.value
    );

    total_night.value = intialNight;
    setReserveRoomForm({
      ...reserveRoomForm,
      total_night,
    });
  }, []);

  /** form function  start here */
  const addGuestsHandler = (e) => {
    const { target } = e;
    setMenuTarget(e.currentTarget);
  };

  const onCloseGuestsHandler = () => {
    setMenuTarget(null);
  };

  const onChangeCheckInDateHandler = (event) => {
    const { target } = event;
    const { check_in } = reserveRoomForm;
    check_in.value = target.value;
    changeTotalNightStay();
    setReserveRoomForm({
      ...reserveRoomForm,
      check_in,
    });
  };

  const onChangeCheckOutDateHandler = (event) => {
    const { target } = event;
    const { check_out } = reserveRoomForm;
    check_out.value = target.value;
    changeTotalNightStay();
    setReserveRoomForm({
      ...reserveRoomForm,
      check_out,
    });
  };

  const changeTotalNightStay = () => {
    const { check_in, check_out, total_night } = reserveRoomForm;
    total_night.value = CommonUtlis.dayBetweenTwoDates(
      check_in.value,
      check_out.value
    );
    setReserveRoomForm({
      ...reserveRoomForm,
      total_night,
    });
  };

  const onChoseGustsNumber = (event, selectedvalue) => {
    const { total_guests } = reserveRoomForm;
    total_guests.value = selectedvalue;
    setMenuTarget(null);
    setReserveRoomForm({
      ...reserveRoomForm,
      total_guests,
    });
  };

  const getAllowedGusts = (allowedNumber = 0) => {
    const convertGuestIntoArray = [];
    for (let i = 1; i <= allowedNumber; i++) {
      convertGuestIntoArray.push(i);
    }
    return convertGuestIntoArray;
  };

  const isReverseFormValid = () => {
    const { check_in, check_out } = reserveRoomForm;
    if (check_out.value && check_in.value) return false;
    return true;
  };

  const onPayNowHandler = () => {
    console.log("hey-->");
  };
  /** End here */

  const { check_in, check_out, total_guests, total_night, total_price } =
    reserveRoomForm;
  console.log(check_in, "-->check", reserveRoomForm);
  return (
    <form
      role="book-reverse"
      className="reverse-form"
      onSubmit={onPayNowHandler}
    >
      <div className="form-selected-location">
        {selectedLocation.length ? (
          <Label className="mb-1 location-text p-1 fw-bold">
            Location:{selectedLocation[0].short_address}
          </Label>
        ) : null}
      </div>
      <div className="form-heading">
        <div className="room-content">From</div>
        <div className="room-prices-wrapper">
          <span className="fa fa-inr icon-cur" aria-hidden="true"></span>
          <span className="price">{room?.room_price?.toFixed(2)}</span>
          <span className="fw-bold">/night</span>
        </div>
      </div>
      <div className="form-reverse-dates">
        <Input
          type="date"
          inputLabel="Check In"
          inputLabelClasses="fw-normal text-uppercase"
          errorText={!check_in?.value ? check_in?.errorText : ""}
          min={dateFormatYearMonthDate(new Date())}
          onChange={onChangeCheckInDateHandler}
          value={check_in?.value ? check_in.value : ""}
          name="check_in"
        />
        <Input
          type="date"
          inputLabel="Check Out"
          inputLabelClasses="fw-normal text-uppercase"
          errorText={!check_out?.value ? check_out?.errorText : ""}
          min={
            check_in?.value
              ? check_in?.value
              : dateFormatYearMonthDate(new Date())
          }
          onChange={onChangeCheckOutDateHandler}
          value={check_out?.value ? check_out.value : ""}
          name="check_out"
        />
      </div>
      <div className="reverse-form-night">
        <Label
          labelName=""
          type="info"
          className="w-full total-night-label fw-bold"
        >
          <span> Total Night</span>
          <span className="ml-auto">{total_night.value} Night</span>
        </Label>
        <Button
          title="Guests"
          className="bg-white w-full flex-1"
          onClick={addGuestsHandler}
        >
          <div className="d-flex">
            {total_guests.value} Guest
            <span className="guest-icon ml-auto">
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
          </div>
        </Button>
        <Menu
          isOpen={Boolean(menutarget)}
          targetElement={menutarget}
          onClose={onCloseGuestsHandler}
        >
          {getAllowedGusts(room.allowed_gustes).map((item, index) => (
            <Menu.MenuItem onClickItem={onChoseGustsNumber} key={item}>
              {item}
            </Menu.MenuItem>
          ))}
        </Menu>
      </div>
      <div className="w-50 m-auto mt-1 cursor-pointer">
        <Button
          className="novel-button--block bg-error mt-1 br-round"
          onClick={onPayNowHandler}
          disabled={isReverseFormValid()}
          title="Pay Now"
        >
          <span>Pay</span>
          <span className="fa fa-inr ml-5px" aria-hidden="true"></span>
          <span className="ml-5px">
            {CommonUtlis.numberWithCommas(total_price.value)}
          </span>
        </Button>
      </div>
      {/* <Button
        className="novel-button--primary novel-button--large novel-button--block mt-1"
        title="Checkout"
        onClick={onPayNowHandler}
        disabled={isReverseFormValid()}
      >
        <span className="ml-1">Pay Now</span>
        <span className="ml-1">
          {total_price.value}
          </span>
      </Button> */}
    </form>
  );
};

export default NovelRoomReverseForm;
