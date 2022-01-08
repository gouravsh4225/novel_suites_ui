import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Label,
  ConfirmModal,
  Loader,
  Toastr,
} from "../../../UI_Library/UI_Library";
import AuthService from "../../../Services/AuthService/AuthService";
import { removeItemFromCart } from "../../../Services/NovelRoomService/NovelRoomService";
import CommonUtlis from "../../../Utils/CommonUtlis";
import { dateFormatYearMonthDate } from "../../../Utils/FormValidationUtlis";
import "./UserProfileCart.scss";

const UserProfileCart = () => {
  const [userCarts, setUserCarts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState({
    open: false,
    selected_remove_item: {},
  });

  const getUserCartData = () => {
    Loader.show();
    AuthService.getUserCartDetails()
      .then((cartResponse) => {
        Loader.hide();
        let { data } = cartResponse.response;
        if (data.items && Array.isArray(data.items) && data.items.length) {
          let { user_details } = data.items[0];
          setUserDetails(user_details[0]);
          setUserCarts(data.items);
        }
      })
      .catch((cartError) => {
        Loader.hide();
        console.log(cartError, "cartError");
      });
  };

  useEffect(() => {
    getUserCartData();
  }, []);

  const getTotalItemTotalPrices = () => {
    return (
      <Fragment>
        <Label className="fw-bold">
          My Booking Bag ({userCarts.length}
          {userCarts.length < 1 ? ` Item` : ` Items`})
        </Label>
        <Label className="fw-bold">
          Total :
          <span className="fa fa-inr fs-textMd" aria-hidden="true"></span>
          <span className="ml-5px">
            {CommonUtlis.numberWithCommas(getTotalPrice())}
          </span>
        </Label>
      </Fragment>
    );
  };

  const getTotalPrice = () => {
    return userCarts.reduce((previousValue, currentValue) => {
      const { rooms_deatails, total_night } = currentValue;
      return previousValue + rooms_deatails[0].room_price * total_night;
    }, 0);
  };

  const onRemoveCartItem = (e, cartItem) => {
    setIsConfirmOpen({
      open: true,
      selected_remove_item: cartItem,
    });
  };

  const onRemoveConfirm = () => {
    const { selected_remove_item } = isConfirmOpen;
    Loader.show();
    removeItemFromCart(selected_remove_item._id)
      .then((responseData) => {
        console.log("remove response", responseData);
        const { response } = responseData;
        const { message } = response;
        Loader.hide();
        Toastr.success(message);
        getUserCartData();
        setIsConfirmOpen({
          isOpen: false,
          selected_remove_item: {},
        });
      })
      .catch((erorr) => {
        Loader.hide();
        console.log("remove Error");
      });
  };

  return (
    <Fragment>
      <ConfirmModal
        isOpen={isConfirmOpen.open}
        onClose={(e) =>
          setIsConfirmOpen({
            open: false,
            selected_remove_item: {},
          })
        }
        onConfirm={onRemoveConfirm}
      >
        Are you sure you want to remove this item
      </ConfirmModal>
      <div className="user-profile-cart-wrapper mt-1">
        <div className="container">
          <div className="grid-container grid-gap-1 user-cart-grid">
            <section className="user-grid">
              <section className="user-profile-change">
                <Card className="no-box-shadow d-flex user-profile-card user-card-border">
                  <div className="user-details">
                    <div className="d-block">
                      <span className="mr-1">User Details:</span>
                      <p className="fw-bold">
                        <span
                          className="fa fa-user mr-1"
                          aria-hidden="true"
                        ></span>
                        {userDetails?.name}
                      </p>
                      <p className="fw-bold">
                        <span
                          className="fa fa-envelope mr-1"
                          aria-hidden="true"
                        ></span>
                        {userDetails?.email_address}
                      </p>
                    </div>
                  </div>
                </Card>
              </section>
              <section className="mt-1 d-flex flex-align-center flex-justify-space-between">
                {getTotalItemTotalPrices()}
              </section>
              <div className="mt-1">
                {userCarts.map((cartItem) => {
                  let {
                    rooms_deatails,
                    location_details,
                    start_date,
                    total_night,
                  } = cartItem;
                  return (
                    <Card
                      key={cartItem._id}
                      className="mt-1 no-box-shadow user-card-border"
                    >
                      <Card.Content className="m-0">
                        <div className="cart-media grid-container grid-gap-1">
                          <img
                            className="h-full image-fit-cover user-card-border"
                            src="https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg"
                            alt={`${rooms_deatails[0].room_name}`}
                          />
                          <div className="cart-media-content">
                            <p className="fw-bold cart-hotel-heading">
                              {location_details[0].hotel_name},{" "}
                              {location_details[0].short_address}
                            </p>
                            <p>{rooms_deatails[0].room_name}</p>
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
                            <span
                              className="fa fa-inr"
                              aria-hidden="true"
                            ></span>
                            <span className="cart-media-price ml-5px">
                              {rooms_deatails[0].room_price * total_night}
                            </span>
                          </p>
                        </div>
                      </Card.Content>
                      <div className="user-card-border mt-1"></div>
                      <Card.Footer className="cart-media-footer mt-1">
                        <Button
                          className="bg-error remove-button"
                          title="Remove"
                          onClick={(e) => onRemoveCartItem(e, cartItem)}
                        >
                          <span
                            className="fa fa-trash"
                            aria-hidden="true"
                          ></span>
                          <span className="ml-5px">Remove</span>
                        </Button>
                        <Button
                          className="remove-button ml-1 no-box-shadow"
                          title="Remove"
                        >
                          <span
                            className="fa fa-bookmark-o"
                            aria-hidden="true"
                          ></span>
                          <span className="ml-5px">Save For Later</span>
                        </Button>
                      </Card.Footer>
                    </Card>
                  );
                })}
              </div>
            </section>
            <section className="grid-summary">
              <Card className="no-box-shadow user-card-border pos-sticky summary-card">
                <p className="fw-bold fs-textMd ">
                  Price Details ({userCarts.length}
                  {userCarts.length < 1 ? ` Item` : ` Items`})
                </p>
                <Card.Content>
                  <div className="d-flex flex-justify-space-between">
                    <p>Total MRP</p>
                    <p>
                      <span className="fa fa-inr"></span>
                      {CommonUtlis.numberWithCommas(getTotalPrice())}
                    </p>
                  </div>
                  <div className="d-flex flex-justify-space-between">
                    <p>Discount on MRP</p>
                    <p>
                      -<span className="fa fa-inr"></span>0
                    </p>
                  </div>
                  <div className="user-card-border mt-1"> </div>
                  <div className="d-flex flex-justify-space-between fw-bold mt-1">
                    <p>Total</p>
                    <p>
                      <span className="fa fa-inr"></span>
                      {CommonUtlis.numberWithCommas(getTotalPrice())}
                    </p>
                  </div>
                </Card.Content>
                <Card.Footer>
                  <Button
                    className="novel-button--block no-box-shadow bg-error"
                    buttonLabel="Book Room"
                  />
                </Card.Footer>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfileCart;
