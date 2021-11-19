import APIUtlis from "../../Utils/APIUtlis";

const loginSubmit = (formData) => {
  return APIUtlis.postApi("user-auth/login", formData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json();
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
const AuthService = {
  loginSubmit,
};
export default AuthService;
