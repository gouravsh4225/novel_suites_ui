import { APIUtlis } from "../../Utils/APIUtlis";

const loginSubmit = (formData) => {
  return APIUtlis.postApi("user-auth/login", formData)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};
const AuthService = {
  loginSubmit,
};
export default AuthService;
