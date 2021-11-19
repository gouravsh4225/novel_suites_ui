const setSessionUserItems = ({ access_token, user_data }) => {
  console.log("user_data", user_data);
  sessionStorage.setItem("token", access_token);
  sessionStorage.setItem("userDetails", JSON.stringify(user_data));
};

const CommonUtlis = {
  setSessionUserItems,
};

export default CommonUtlis;
