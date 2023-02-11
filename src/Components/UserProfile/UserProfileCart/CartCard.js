import React from "react";
import { dateFormatYearMonthDate } from "../../../Utils/FormValidationUtlis";
import { Card, Button } from "../../../UI_Library/UI_Library";

const CartCard = ({ data, onRemoveCartItem, onSaveForLaterHandler }) => {
  let {
    rooms_deatails,
    location_details,
    start_date,
    total_night,
    is_save_later,
  } = data;
  return (
    <Card className="mt-1 no-box-shadow user-card-border">
      <Card.Content className="m-0">
        <div className="cart-media grid-container grid-gap-1">
          <img
            className="h-full image-fit-cover user-card-border"
            src={rooms_deatails[0]?.room_pics[0]}
            alt={`${rooms_deatails[0]?.room_name}`}
          />
          <div className="cart-media-content">
            <p className="fw-bold cart-hotel-heading">
              {location_details[0].hotel_name},{" "}
              {location_details[0].short_address}
            </p>
            <p>{rooms_deatails[0]?.room_name}</p>
            <p>
              <span className="fw-bold">Start Day:</span>
              <span className="ml-5px">
                {dateFormatYearMonthDate(start_date)}
              </span>
            </p>
            <p>
              <span className="fw-bold">Nights:</span>
              <span className="ml-5px">{total_night}</span>
            </p>
          </div>
          <p className="text-end fw-bold">
            <span className="fa fa-inr" aria-hidden="true"></span>
            <span className="cart-media-price ml-5px">
              {rooms_deatails[0]?.room_price * total_night}
            </span>
          </p>
        </div>
      </Card.Content>
      <div className="user-card-border mt-1"></div>
      <Card.Footer className="cart-media-footer mt-1">
        <Button
          className="bg-error remove-button"
          title="Remove"
          onClick={(e) => onRemoveCartItem(e, data)}
        >
          <span className="fa fa-trash" aria-hidden="true"></span>
          <span className="ml-5px">Remove</span>
        </Button>
        {!is_save_later ? (
          <Button
            className="remove-button ml-1 no-box-shadow"
            title="Remove"
            onClick={(e) => onSaveForLaterHandler(e, data)}
          >
            <span className="fa fa-bookmark-o" aria-hidden="true"></span>
            <span className="ml-5px">Save For Later</span>
          </Button>
        ) : null}
      </Card.Footer>
    </Card>
  );
};

export default CartCard;
