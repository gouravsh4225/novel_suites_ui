import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Loader, Toast } from "../../../UI_Library/UI_Library";
import AuthService from "../../../Services/AuthService/AuthService";
import "./ForgotPasswordPage.scss";
import { NumberValidationChecker } from "../../../Utils/FormValidationUtlis";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const [forgotPasswordForms, setForgotPasswordForm] = useState({
    phone_number: {
      value: "",
      errorText: "",
    },
    verify_code: {
      value: "",
      errorText: "",
    },
  });

  const [isOtpSent, setIsOtpSent] = useState(false);

  const onForgotPasswordFormSubmit = (event) => {
    console.log("hey");
  };

  const onChangePhoneNumber = (e, inputValue) => {
    const { phone_number } = forgotPasswordForms;
    phone_number.value = inputValue;
    if (!inputValue) {
      phone_number.errorText = "Mobile Number is required";
    } else {
      let phoneValidator = NumberValidationChecker(inputValue);
      phone_number.errorText = phoneValidator.message;
    }
    setForgotPasswordForm({
      ...forgotPasswordForms,
      phone_number,
    });
  };

  const onChangeVerifyCode = (e, inputValue) => {
    const { verify_code } = forgotPasswordForms;
    verify_code.value = inputValue;
    verify_code.errorText = !inputValue
      ? "Verify Code is required for next step"
      : "";
    setForgotPasswordForm({
      ...forgotPasswordForms,
      verify_code,
    });
  };

  const isMobileFormValid = () => {
    const { phone_number } = forgotPasswordForms;
    return phone_number.value && !phone_number.errorText ? false : true;
  };

  const onSendOtpHandler = (event) => {
    event.preventDefault();
    const { phone_number } = forgotPasswordForms;
    if (phone_number.value && !phone_number.errorText) {
      Loader.show();
      let formdata = {
        phone_number: phone_number.value,
      };
      AuthService.checkUserByNumber(formdata)
        .then((user) => {
          sendOtpToUserPhoneNumber(formdata.phone_number);
        })
        .catch((userError) => {
          console.log(userError, "userEror");
          Toast.error(`User ${formdata.phone_number} is not available`);
          Loader.hide();
        });
    }
  };

  const sendOtpToUserPhoneNumber = (phoneNumber) => {
    AuthService.sendOtpToPhone({
      phone_number: `+91${phoneNumber}`,
    })
      .then((otpResponse) => {
        setIsOtpSent(true);
        Loader.hide();
        Toast.success(`Otp is sent to +91${phone_number.value}`, {
          dismissTime: 4000,
        });
      })
      .catch((otpError) => {
        Loader.hide();
        console.log(otpError, "otpError");
        Toast.error("Got some error");
      });
  };

  const onVerifyCodeHandler = (event) => {
    const { verify_code, phone_number } = forgotPasswordForms;
    if (verify_code.value) {
      let json = {
        phone_number: `+91${phone_number.value}`,
        code: verify_code.value,
      };
      Loader.show();
      AuthService.veryOtpPhone(json)
        .then((responseData) => {
          Loader.hide();
          Toast.success("Code is verified");
          history.push(`/reset-password/${btoa(phone_number.value)}`);
        })
        .catch((error) => {
          Loader.hide();
          Toast.error("Got some Error.Please try to send again");
        });
    } else {
      Toast.error("Please enter Verify Code");
      return;
    }
  };

  const { phone_number, verify_code } = forgotPasswordForms;

  return (
    <div className="forgot-password-wrapper pos-relative">
      <section className="forgot-password-section mt-auto mb-auto">
        <div className="forgot-password mr-auto ml-auto">
          <p className="forgot-password--heading">Forgot Password</p>
          <section className="forgot-password--inputs">
            <form
              // onSubmit={onForgotPasswordFormSubmit}
              autoComplete="new-password"
              className="forgot-forms"
            >
              <Input
                inputLabel="Mobile Number"
                type="number"
                errorText={phone_number.errorText}
                name="phone_number"
                onChange={onChangePhoneNumber}
                value={phone_number.value}
                className="novel-suite-input--large fs-textXl"
                autoFocus={true}
                inputLabelClasses="fw-bold"
                disabled={isOtpSent}
              />
              {isOtpSent ? (
                <Input
                  inputLabel="Verify Code*"
                  inputLabelClasses="fw-normal"
                  type="text"
                  errorText={verify_code.errorText ? verify_code.errorText : ""}
                  name="verify_code"
                  onChange={onChangeVerifyCode}
                  value={verify_code.value}
                  errorTextClasses="mt-0"
                  className="h-full"
                />
              ) : null}
              <div className="d-flex flex-algin-center">
                {isOtpSent ? (
                  <Button
                    type="btn"
                    className="mt-1 novel-button--primary forgot-button"
                    buttonLabel="Verify OTP"
                    onClick={onVerifyCodeHandler}
                  />
                ) : (
                  <Button
                    type="submit"
                    className="mt-1 novel-button--primary forgot-button"
                    disabled={isMobileFormValid()}
                    onClick={onSendOtpHandler}
                  >
                    <div className="d-flex">
                      <span
                        className="fa fa-paper-plane"
                        aria-hidden="true"
                      ></span>
                      <span className="ml-1">Send Otp</span>
                    </div>
                  </Button>
                )}
                <a
                  href="/login"
                  className="novel-button mt-1 novel-button--link fs-textSm ml-auto"
                >
                  Login
                </a>
              </div>
            </form>
          </section>
        </div>
      </section>
      <section className="forgot-password--right"></section>
    </div>
  );
};

export default ForgotPasswordPage;
