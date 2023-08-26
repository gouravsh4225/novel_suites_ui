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
const numberWithCommas = (numbers) => {
  var parts = numbers.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const CommonUtlis = {
  setSessionUserItems,
  getSessionUserDetails,
  dayBetweenTwoDates,
  numberWithCommas,
};

export default CommonUtlis;
