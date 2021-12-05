const setSessionUserItems = ({ access_token, user_data }) => {
  sessionStorage.setItem("token", access_token);
  sessionStorage.setItem("userDetails", JSON.stringify(user_data));
};

const getSessionUserDetails = () => {
  return sessionStorage.getItem("userDetails");
};

const CommonUtlis = {
  setSessionUserItems,
  getSessionUserDetails,
};

export default CommonUtlis;
