import { APIUtlis } from "../../Utils/APIUtlis";
import CommonUtlis from "../../Utils/CommonUtlis";

const loginSubmit = (formData) => {
  return APIUtlis.postApi("user-auth/login", formData)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const signUpUser = (formData) => {
  return APIUtlis.postApi("user-auth/signup", formData)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const logOutUser = () => {
  return new Promise((resolve, reject) => {
    sessionStorage.clear();
    resolve(true);
  });
};

const getUserCartDetails = () => {
  const userData = JSON.parse(CommonUtlis.getSessionUserDetails());
  if (userData) {
    let { _id } = userData;
    const url = `rooms/cartdetailsByUserId/${_id}`;
    return APIUtlis.getApi(url)
      .then(APIUtlis.handleSuccessReponse)
      .catch(APIUtlis.handleErrorResponse);
  }
};

const getUserBookings = () => {
  const userData = JSON.parse(CommonUtlis.getSessionUserDetails());
  const { _id } = userData;
  const url = `bookings/user-bookings/${_id}`;
  return APIUtlis.getApi(url)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const sendOtpToPhone = (sendOtpdata) => {
  return APIUtlis.postApi("user-auth/send-otp", sendOtpdata)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const veryOtpPhone = (verifyData) => {
  return APIUtlis.postApi("user-auth/verify-code", verifyData)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const AuthService = {
  loginSubmit,
  signUpUser,
  logOutUser,
  getUserCartDetails,
  getUserBookings,
  sendOtpToPhone,
  veryOtpPhone,
};
export default AuthService;
