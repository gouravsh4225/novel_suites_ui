import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Label,
  Input,
  Button,
  Menu,
  SwitchToggle,
  Toast,
} from "../../../UI_Library/UI_Library";
import CommonUtlis from "../../../Utils/CommonUtlis";
import {
  dateFormatYearMonthDate,
  addDayInDate,
} from "../../../Utils/FormValidationUtlis";
import { loadRazorPayScript } from "../../../Utils/RazorPayUtils";
import { getRoomBookRazorPayOrderId } from "../../../Services/NovelRoomService/NovelRoomService";

const NovelRoomReverseForm = ({ selectedLocation, room, onPayHandler }) => {
  const routerPage = useHistory();
  const { pathname } = useLocation();
  const [menutarget, setMenuTarget] = useState(null);
  const [reserveRoomForm, setReserveRoomForm] = useState({
    check_in: {
      value: dateFormatYearMonthDate(new Date()).toString(),
      errorText: "",
    },
    check_out: {
      value: dateFormatYearMonthDate(addDayInDate(new Date(), 1)).toString(),
      errorText: "",
    },
    total_night: {
      value: 0,
    },
    total_guests: {
      value: 1,
    },
    total_price: {
      value: 0,
    },
    diningOption: [
      {
        label: "Break - fast",
        value: false,
        price: 500,
        labelFor: "breakfast",
      },
      {
        label: "lunch",
        value: false,
        price: 500,
        labelFor: "lunch",
      },
      {
        label: "Dinner",
        value: false,
        price: 500,
        labelFor: "dinner",
      },
      {
        label: "Vehicle Parking",
        value: false,
        price: 100,
        labelFor: "vehicle_parking",
      },
    ],
  });

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
    let sessionUserData = JSON.parse(CommonUtlis.getSessionUserDetails());
    if (!sessionUserData) {
      Toast.warning(
        "Please login first.You will be redirect to login Page now."
      );
      routerPage.push({
        pathname: "/login",
        search: `?redirect=${pathname}`,
      });
      return;
    }
    loadRazorPayScript().then((res) => {
      if (!res) {
        alert("RazorPay script SDK load to failed");
        return;
      }
      let prefill = {
        name: sessionUserData.name,
        email: sessionUserData.email_address,
        contact: sessionUserData.phone_number,
      };
      console.log(prefill, "pref");
      let orderCreateJson = {
        amount: getTotalPayment(),
        currency: "INR",
      };
      console.log(reserveRoomForm, "form");

      const createConfirmJson = {};
      //   getRoomBookRazorPayOrderId(orderCreateJson)
      //     .then((res) => {
      //       loadRazorPayWindow(res.response, prefill, sessionUserData);
      //     })
      //     .catch((error) => {
      //       const { response } = error;
      //       Toast.error(response.message);
      //     });
    });
  };

  const loadRazorPayWindow = (data, prefill, sessionUserData) => {
    const razorPayoptions = {
      prefill: prefill,
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount.toString(),
      currency: data.currency,
      name: "Novel Suite",
      description: "",
      order_id: data.id,
      image:
        "https://novel-suites.s3.ap-south-1.amazonaws.com/novel-suite-assets/logo_novel_png.png",
      handler: (res) => {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          res;

        const data = {
          razorObject: res,
          reserveRoomForm,
          sessionUserData,
        };
        onPayHandler(data);
        // Loader.show();
        // confirmRazorPaymemtSuccess({
        //   orderCreationId: data.id,
        //   razorpayPaymentId: razorpay_payment_id,
        //   razorpayOrderId: razorpay_order_id,
        //   razorpaySignature: razorpay_signature,
        //   cart_ids: cart_ids,
        // })
        //   .then((res) => {
        //     Loader.hide();
        //     if (res) {
        //       console.log("gotcha-->");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     Loader.hide();
        //   });
      },
      theme: {
        color: "black",
      },
    };
    const razorpayPaymentObject = window.Razorpay(razorPayoptions);
    razorpayPaymentObject.open();
  };

  const onChangeDiningTypesHandler = (toggelValue, item) => {
    const { diningOption } = reserveRoomForm;
    diningOption.forEach((type) => {
      if (type.labelFor === item.labelFor) {
        type.value = toggelValue;
      }
    });
    setReserveRoomForm({
      ...reserveRoomForm,
      diningOption,
    });
  };

  const getTotalPayment = () => {
    let diningExtraSum = 0;
    let totalAmount = 0;
    if (Object.keys(room).length) {
      diningExtraSum = diningOption.reduce((prev, current) => {
        if (current.value) {
          return prev + current.price;
        } else {
          return prev;
        }
      }, 0);
    }
    if (total_night.value) {
      totalAmount =
        total_night.value * room.room_price +
        diningExtraSum * total_night.value;
    } else {
      totalAmount = room.room_price + diningExtraSum;
    }
    return totalAmount;
  };

  const checkIsTotalChange = useCallback(() => {
    return getTotalPayment();
  }, [getTotalPayment]);

  useEffect(() => {
    const previousValue = checkIsTotalChange;
    const { total_price } = reserveRoomForm;
    if (previousValue !== total_price) {
      total_price.value = getTotalPayment();
      setReserveRoomForm({
        ...reserveRoomForm,
        total_price,
      });
    }
    console.log("console.--->");
  }, []);

  /** End here */

  const { check_in, check_out, total_guests, total_night, diningOption } =
    reserveRoomForm;

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
      <div className="d-flex flex-wrap flex-justify-space-between">
        {diningOption.map((item) => (
          <SwitchToggle
            className="mt-1"
            labelName={item.label}
            labelFor={item.labelFor}
            onChange={(e) => onChangeDiningTypesHandler(e, item)}
            isToggled={item.value}
            key={item.label}
          />
        ))}
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
            {CommonUtlis.numberWithCommas(getTotalPayment())}
          </span>
        </Button>
      </div>
    </form>
  );
};

export default NovelRoomReverseForm;
