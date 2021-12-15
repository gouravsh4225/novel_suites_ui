const setSessionUserItems = (access_token, data) => {
  sessionStorage.setItem("token", access_token);
  sessionStorage.setItem("userDetails", JSON.stringify(data));
};

const getSessionUserDetails = () => {
  return sessionStorage.getItem("userDetails");
};

const dayBetweenTwoDates = (startDate, endDate) => {
  if (startDate && endDate) {
    const start_date = new Date(startDate);
    const end_date = new Date(endDate);
    const diffTime = Math.abs(end_date - start_date);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
};

const CommonUtlis = {
  setSessionUserItems,
  getSessionUserDetails,
  dayBetweenTwoDates,
};

export default CommonUtlis;
