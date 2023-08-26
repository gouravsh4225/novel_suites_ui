import { APIUtlis } from "../../Utils/APIUtlis";

const getAllRoomByLocation = (locationId) => {
  const url = `rooms/location/${locationId}`;
  return APIUtlis.getApi(url)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const getRoomBookRazorPayOrderId = (orderCreateJson) => {
  return APIUtlis.postApi("bookings/paymentOrderId", orderCreateJson)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const confirmRazorPaymemtSuccess = (data) => {
  return APIUtlis.postApi("bookings/razorpay/success", data)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const getRoomByLocationIdAndRoomId = (locationId, roomId) => {
  const url = `rooms/location/${locationId}/room/${roomId}`;
  return APIUtlis.getApi(url)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const addUserToCartRoom = (cart_details) => {
  return APIUtlis.postApi("rooms/addtocart", cart_details)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const removeItemFromCart = (cartId) => {
  return APIUtlis.deleteApi(`rooms/deletecartdetailsByCartId/${cartId}`)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const addToSaveLaterList = (cartId, cartObject) => {
  return APIUtlis.updateApi(
    `rooms/updatecartdetailsByCartId/${cartId}`,
    cartObject
  )
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const getUserCartDetailsByCartId = (id) => {
  return APIUtlis.getApi(`rooms/cartdetailsByCartId/${id}`)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

export {
  getAllRoomByLocation,
  getRoomBookRazorPayOrderId,
  confirmRazorPaymemtSuccess,
  getRoomByLocationIdAndRoomId,
  addUserToCartRoom,
  removeItemFromCart,
  addToSaveLaterList,
  getUserCartDetailsByCartId,
};
