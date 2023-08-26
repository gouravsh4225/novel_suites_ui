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
    const fullYear = isDateCorrect.getFullYear();
    const month = isDateCorrect.getMonth() + 1;
    const day = isDateCorrect.getDate();

    let formattedDate = `${fullYear}-${addZeroInFrontNumber(
      month
    )}-${addZeroInFrontNumber(day)}`;
    return formattedDate;
  }
  return false;
};

const addDayInDate = (date, addDay = 1) => {
  if (date) {
    const isDateCorrect = new Date(date);
    const fullYear = isDateCorrect.getFullYear();
    const month = isDateCorrect.getMonth() + 1;
    const day = isDateCorrect.getDate() + addDay;
    return new Date(
      `${fullYear}-${addZeroInFrontNumber(month)}-${addZeroInFrontNumber(day)}`
    );
  }

  return;
};

const addZeroInFrontNumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

export {
  EmailValidationChecker,
  NumberValidationChecker,
  CompareTwoString,
  dateFormatYearMonthDate,
  addDayInDate,
};
