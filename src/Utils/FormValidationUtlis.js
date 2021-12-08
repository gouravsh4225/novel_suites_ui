const EmailValidationChecker = (email, initialMessage = "") => {
  if (!email) return `${initialMessage}`;
  let email_regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  let emailValidationJson = {
    isValid: email_regex.test(email),
    message: !email_regex.test(email) ? "Please enter valid Email Address" : "",
  };
  return emailValidationJson;
};

const NumberValidationChecker = (numberStr, initialMessage = "", ...rest) => {
  let { min, max } = rest;
  let number_regrex = new RegExp(/^[0-9]{10}$/);
  let checkNumber = number_regrex.test(numberStr);
  let numberValidationJson = {
    isValid: checkNumber,
    message: `${initialMessage}`,
  };
  numberValidationJson.message = !checkNumber
    ? "Please enter valid number"
    : "";
  if (min || max) {
    // To do
  }
  return numberValidationJson;
};

const CompareTwoString = (original_str, compare_str) => {
  if (!original_str && !compare_str) return false;
  return original_str === compare_str;
};

const dateFormatYearMonthDate = (date) => {
  const isDateCorrect = new Date(date);
  if (isDateCorrect) {
    let formattedDate = `${isDateCorrect.getFullYear()}-${
      isDateCorrect.getMonth() + 1
    }-${isDateCorrect.getDate()}`;
    return formattedDate;
  }
  return false;
};

export {
  EmailValidationChecker,
  NumberValidationChecker,
  CompareTwoString,
  dateFormatYearMonthDate,
};
