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

const AuthService = {
  loginSubmit,
  signUpUser,
  logOutUser,
  getUserCartDetails,
};
export default AuthService;
