import { APIUtlis } from "../../Utils/APIUtlis";

const getAllRoomByLocation = (locationId) => {
  const url = `rooms/location/${locationId}`;
  return APIUtlis.getApi(url)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const getRoomBookRazorPayOrderId = () => {
  return APIUtlis.postApi("bookings/paymentOrderId")
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const confirmRazorPaymemtSuccess = (data) => {
  return APIUtlis.postApi("bookings/razorpay/success", data)
    .then(APIUtlis.handleResponse)
    .catch(APIUtlis.handleErrorResponse);
};

export {
  getAllRoomByLocation,
  getRoomBookRazorPayOrderId,
  confirmRazorPaymemtSuccess,
};
