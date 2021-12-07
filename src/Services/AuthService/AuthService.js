import { APIUtlis } from "../../Utils/APIUtlis";

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
const AuthService = {
  loginSubmit,
  signUpUser,
};
export default AuthService;
