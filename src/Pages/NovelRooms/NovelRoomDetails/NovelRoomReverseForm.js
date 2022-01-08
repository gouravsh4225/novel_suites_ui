import React from "react";

const NovelRoomReverseForm = ({ selectedLocation, room }) => {
  return (
    <div className="novel-room-booking">
      <div className="reverse-card">
        <div className="reverse-ttile">
          <h3>Reserve your Room</h3>
        </div>
        <form
          role="book-reverse"
          className="reverse-form"
          onSubmit={onAddToCartFormSubmit}
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
          <Button
            className="novel-button--primary novel-button--large novel-button--block mt-1"
            title="Checkout"
            onClick={onAddToCartFormSubmit}
            disabled={isReverseFormValid()}
          >
            <span>
              <i className="fa fa-cart-plus" aria-hidden="true"></i>
            </span>
            <span className="ml-1">Add To Cart</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NovelRoomReverseForm;
