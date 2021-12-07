const setSessionUserItems = (access_token, data) => {
  sessionStorage.setItem("token", access_token);
  sessionStorage.setItem("userDetails", JSON.stringify(data));
};

const getSessionUserDetails = () => {
  return sessionStorage.getItem("userDetails");
};

const CommonUtlis = {
  setSessionUserItems,
  getSessionUserDetails,
};

export default CommonUtlis;
