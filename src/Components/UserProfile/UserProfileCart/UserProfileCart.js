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
import {
  removeItemFromCart,
  addToSaveLaterList,
  getRoomBookRazorPayOrderId,
  confirmRazorPaymemtSuccess,
} from "../../../Services/NovelRoomService/NovelRoomService";
import CommonUtlis from "../../../Utils/CommonUtlis";
import {
  loadRazorPayScript,
  RazorPayPaymentOptions,
} from "../../../Utils/RazorPayUtils";
import "./UserProfileCart.scss";
import CartCard from "./CartCard";

const UserProfileCart = () => {
  const [userCarts, setUserCarts] = useState({
    currentCartData: [],
    saveLaterCartData: [],
  });
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
        const { cartData, saveLaterData } = data;
        /** for fetch current Cart data */
        if (data && Array.isArray(cartData) && cartData.length) {
          let { user_details } = cartData[0];
          setUserDetails(user_details[0]);
          setUserCarts({
            currentCartData: cartData,
            saveLaterCartData: saveLaterData,
          });
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

  const getTotalItemTotalPrices = (data) => {
    return (
      <Fragment>
        <Label className="fw-bold">
          My Booking Bag ({data.length}
          {data.length < 1 ? ` Item` : ` Items`})
        </Label>
        <Label className="fw-bold">
          Total :
          <span className="fa fa-inr fs-textMd" aria-hidden="true"></span>
          <span className="ml-5px">
            {CommonUtlis.numberWithCommas(getTotalPrice(data))}
          </span>
        </Label>
      </Fragment>
    );
  };

  const getTotalPrice = (priceList) => {
    return priceList.reduce((previousValue, currentValue) => {
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
        const { response } = responseData;
        const { message } = response;
        Loader.hide();
        Toastr.success(message);
        getUserCartData();
        setIsConfirmOpen({
          isOpen: false,
          selected_remove_item: {},
        });
        getUserCartData();
      })
      .catch((erorr) => {
        Loader.hide();
        console.log("remove Error");
      });
  };

  const onSaveForLaterHandler = (e, saveLaterItems) => {
    const { _id } = saveLaterItems;
    saveLaterItems.is_save_later = true;
    Loader.show();
    addToSaveLaterList(_id, saveLaterItems)
      .then((res) => {
        Loader.hide();
        let { response } = res;
        Toastr.success("Item is added successfully on save later");
        getUserCartData();
      })
      .catch((error) => {
        Loader.hide();
      });
  };

  const onPayAmountHandler = () => {
    const totalPrice = getTotalPrice(currentCartData);
    const cart_ids = currentCartData.map((item) => item._id);
    console.log(cart_ids, "cart_ids");
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
      console.log(prefill, "pref");
      getRoomBookRazorPayOrderId()
        .then((res) => {
          let { data } = res.response;
          console.log("cart_ids--> in api", cart_ids);
          const razorPayoptions = {
            prefill: prefill,
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount.toString(),
            currency: data.currency,
            name: "Novel Suite",
            description: "h",
            order_id: data.id,
            image:
              "https://novel-suites-ui.vercel.app/static/media/logo_novel.78ee88e9.gif",
            handler: (res) => {
              let {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              } = res;
              console.log("hey--->", cart_ids);
              Loader.show();
              confirmRazorPaymemtSuccess({
                orderCreationId: data.id,
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id,
                razorpaySignature: razorpay_signature,
                cart_ids: cart_ids,
              })
                .then((res) => {
                  Loader.hide();
                  if (res) {
                    console.log("gotcha-->");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  Loader.hide();
                });
            },
            theme: {
              color: "black",
            },
          };
          console.log(razorPayoptions, "-->Options");
          const razorpayPaymentObject = window.Razorpay(razorPayoptions);
          razorpayPaymentObject.open();
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  };

  const { currentCartData, saveLaterCartData } = userCarts;
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
                {getTotalItemTotalPrices(currentCartData)}
              </section>
              <div className="mt-1">
                {currentCartData.map((cartItem) => {
                  return (
                    <CartCard
                      key={cartItem._id}
                      data={cartItem}
                      onRemoveCartItem={onRemoveCartItem}
                      onSaveForLaterHandler={onSaveForLaterHandler}
                    />
                  );
                })}
              </div>
              <section className="mt-1">
                <Label className="fw-bold">
                  Save For Later Bag ({saveLaterCartData.length}
                  {saveLaterCartData.length < 1 ? ` Item` : ` Items`})
                </Label>
                {saveLaterCartData.map((saveItem) => (
                  <CartCard
                    key={saveItem._id}
                    data={saveItem}
                    onRemoveCartItem={onRemoveCartItem}
                  />
                ))}
              </section>
            </section>
            <section className="grid-summary">
              <Card className="no-box-shadow user-card-border pos-sticky summary-card">
                <p className="fw-bold fs-textMd ">
                  Price Details ({currentCartData.length}
                  {currentCartData.length < 1 ? ` Item` : ` Items`})
                </p>
                <Card.Content>
                  <div className="d-flex flex-justify-space-between">
                    <p>Total MRP</p>
                    <p>
                      <span className="fa fa-inr"></span>
                      {CommonUtlis.numberWithCommas(
                        getTotalPrice(currentCartData)
                      )}
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
                      {CommonUtlis.numberWithCommas(
                        getTotalPrice(currentCartData)
                      )}
                    </p>
                  </div>
                </Card.Content>
                <Card.Footer>
                  <Button
                    className="novel-button--block no-box-shadow bg-error"
                    onClick={onPayAmountHandler}
                  >
                    <span>Pay</span>
                    <span
                      className="fa fa-inr ml-5px"
                      aria-hidden="true"
                    ></span>
                    <span className="ml-5px">
                      {CommonUtlis.numberWithCommas(
                        getTotalPrice(currentCartData)
                      )}
                    </span>
                  </Button>
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
