import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Loader, Toast } from "../../../UI_Library/UI_Library";
import {
  EmailValidationChecker,
  NumberValidationChecker,
  CompareTwoString,
} from "../../../Utils/FormValidationUtlis";
import "./SignUp.scss";
import AuthService from "../../../Services/AuthService/AuthService";
import CommonUtlis from "../../../Utils/CommonUtlis";

const SignUpPage = () => {
  const signUpHistory = useHistory();
  const [signUpFormInput, setSignUpFormInput] = useState({
    phone_number: {
      value: "",
      errorText: "",
    },
    name: {
      value: "",
      errorText: "",
    },
    email_address: {
      value: "",
      errorText: "",
    },
    password: {
      value: "",
      errorText: "",
    },
    confirm_password: {
      value: "",
      errorText: "",
    },
    verify_code: {
      value: "",
      errorText: "",
    },
  });
  const [signUpFormSteps, setSignUpFormSteps] = useState([
    "Mobile Number",
    "Personal Details",
  ]);

  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const onChangePhoneNumber = (e, inputValue) => {
    const { phone_number } = signUpFormInput;
    phone_number.value = inputValue;
    if (!inputValue) {
      phone_number.errorText = "Phone is required";
    } else {
      let phoneValidator = NumberValidationChecker(inputValue);
      phone_number.errorText = phoneValidator.message;
    }

    setSignUpFormInput({
      ...signUpFormInput,
      phone_number,
    });
  };

  const onChangeFullName = (e, inputValue) => {
    const { name } = signUpFormInput;
    name.value = inputValue;
    name.errorText = !inputValue ? "Name is required" : "";

    setSignUpFormInput({
      ...signUpFormInput,
      name,
    });
  };
  const onChangeEmailAddress = (e, inputValue) => {
    const { email_address } = signUpFormInput;
    email_address.value = inputValue;
    if (!inputValue) {
      email_address.errorText = "Email is required";
    } else {
      let isEmailValid = EmailValidationChecker(inputValue);
      email_address.errorText = isEmailValid.message;
    }
    setSignUpFormInput({
      ...signUpFormInput,
      email_address,
    });
  };

  const onChangePassword = (e, inputValue) => {
    const { password } = signUpFormInput;
    password.value = inputValue;
    password.errorText = !inputValue ? "Password is required" : "";
    setSignUpFormInput({
      ...signUpFormInput,
      password,
    });
  };

  const onChangeConfirmPassword = (e, inputValue) => {
    const { confirm_password } = signUpFormInput;
    confirm_password.value = inputValue;
    confirm_password.errorText = !inputValue
      ? "Confirm Password is required"
      : "";
    setSignUpFormInput({
      ...signUpFormInput,
      confirm_password,
    });
  };

  const onChangeVerifyCode = (e, inputValue) => {
    const { verify_code } = signUpFormInput;
    verify_code.value = inputValue;
    verify_code.errorText = !inputValue
      ? "Verify Code is required for next step"
      : "";
    setSignUpFormInput({
      ...signUpFormInput,
      verify_code,
    });
  };

  const onSignUpHandler = (event) => {
    event.preventDefault();
    const { phone_number, name, email_address, password, confirm_password } =
      signUpFormInput;
    if (
      !phone_number.value ||
      !name.value ||
      !email_address.value ||
      !password.value ||
      !confirm_password.value
    ) {
      Toast.error("Please enter all mandatory fields", {
        toastPos: "top-left",
      });
      return;
    }
    let isBothPasswordEqual = CompareTwoString(
      password.value,
      confirm_password.value
    );
    if (!isBothPasswordEqual) {
      Toast.error("Password is not matched.", {
        toastPos: "top-left",
      });
      return;
    }

    let signUpFormData = {
      name: name.value,
      password: password.value,
      phone_number: phone_number.value,
      email_address: email_address.value,
    };

    AuthService.signUpUser(signUpFormData)
      .then((userCratedResponse) => {
        let { response } = userCratedResponse;
        Toast.success(response.message);
        CommonUtlis.setSessionUserItems(response.access_token, response.data);
        setTimeout(() => {
          signUpHistory.push("/");
        }, 1000);
      })
      .catch((userCreatedError) => {
        let { statusText, response } = userCreatedError;

        if (response.message) {
          Toast.error(`${response.message}`);
        } else {
          Toast.error(`${statusText}`);
        }
      });
  };

  const onSendOtpHandler = (event) => {
    event.preventDefault();
    const { phone_number } = signUpFormInput;
    if (phone_number.value && !phone_number.errorText) {
      Loader.show();
      AuthService.sendOtpToPhone({
        phone_number: `+91${phone_number.value}`,
      })
        .then((otpResponse) => {
          setIsOtpSent(true);
          Loader.hide();
          console.log(otpResponse, "otpResponse");
          Toast.success(`Otp is sent to +91${phone_number.value}`, {
            dismissTime: 4000,
          });
        })
        .catch((otpError) => {
          Loader.hide();
          console.log(otpError, "otpError");
          Toast.error("Got some erorr");
        });
    }
  };

  const onVerifyCodeHandler = (event) => {
    const { verify_code, phone_number } = signUpFormInput;
    if (verify_code.value) {
      let json = {
        phone_number: `+91${phone_number.value}`,
        code: verify_code.value,
      };
      Loader.show();
      AuthService.veryOtpPhone(json)
        .then((responseData) => {
          Loader.hide();
          setCurrentFormStep(1);
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

  const onChangeStepper = (current) => {
    setCurrentFormStep(current);
  };

  const onClickPerviousHandler = () => {
    const { verify_code } = signUpFormInput;
    verify_code.value = "";
    verify_code.errorText = "";
    setSignUpFormInput({
      ...signUpFormInput,
      verify_code,
    });
    setIsOtpSent(false);
    setCurrentFormStep((current) => current - 1);
  };

  const isMobileFormValid = () => {
    const { phone_number } = signUpFormInput;
    return phone_number.value && !phone_number.errorText ? false : true;
  };

  const {
    phone_number,
    name,
    email_address,
    password,
    confirm_password,
    verify_code,
  } = signUpFormInput;

  return (
    <Fragment>
      <div className="sign-up-wrapper">
        <section region="novel-bg" className="sign-up-right-section"></section>

        <section
          region="sign-up form"
          className="sign-up-left-section mt-auto mb-auto"
        >
          <div className="sign-up-form mr-auto ml-auto">
            <p className="sign-up-form--heading fw-normal letter-spacing-3">
              Sign Up
            </p>
            {currentFormStep === 0 ? (
              <form autoComplete="off" className="w-full">
                <div className="mt-1">
                  <Input
                    inputLabel="Mobile Number*"
                    inputLabelClasses="fw-normal"
                    type="text"
                    errorText={
                      phone_number.errorText ? phone_number.errorText : ""
                    }
                    name="phone_number"
                    onChange={onChangePhoneNumber}
                    value={phone_number.value}
                    errorTextClasses="mt-0"
                    className="h-full"
                    placeholder="9876543210"
                  />
                </div>
                {isOtpSent ? (
                  <Fragment>
                    <div className="mt-1">
                      <Input
                        inputLabel="Verify Code*"
                        inputLabelClasses="fw-normal"
                        type="text"
                        errorText={
                          verify_code.errorText ? verify_code.errorText : ""
                        }
                        name="verify_code"
                        onChange={onChangeVerifyCode}
                        value={verify_code.value}
                        errorTextClasses="mt-0"
                        className="h-full"
                      />
                    </div>
                    <div className="d-flex">
                      <Button
                        type="submit"
                        className="novel-button--primary novel-button--small mt-1  ml-auto mr-auto"
                        onClick={onVerifyCodeHandler}
                        buttonLabel="Next"
                      />
                    </div>
                  </Fragment>
                ) : (
                  <div className="d-flex">
                    <Button
                      type="submit"
                      className="novel-button--primary novel-button--small mt-1 ml-auto mr-auto"
                      onClick={onSendOtpHandler}
                      disabled={isMobileFormValid()}
                    >
                      <div className="d-flex">
                        <span
                          className="fa fa-paper-plane"
                          aria-hidden="true"
                        ></span>
                        <span className="ml-1">Send Otp</span>
                      </div>
                    </Button>
                  </div>
                )}
              </form>
            ) : null}
            {currentFormStep === 1 ? (
              <Fragment>
                <form
                  onSubmit={onSignUpHandler}
                  autoComplete="off"
                  className="w-full"
                >
                  <div className="mt-1">
                    <Input
                      inputLabel="Full Name *"
                      inputLabelClasses="fw-normal"
                      type="text"
                      errorText={!name.value ? name.errorText : ""}
                      name="name"
                      onChange={onChangeFullName}
                      value={name.value}
                      className="h-full"
                    />
                  </div>
                  <div className="mt-1">
                    <Input
                      inputLabel="Email Address*"
                      inputLabelClasses="fw-normal"
                      type="email"
                      errorText={
                        email_address.errorText ? email_address.errorText : ""
                      }
                      name="email_address*"
                      onChange={onChangeEmailAddress}
                      value={email_address.value}
                      className={`h-full ${
                        email_address.errorText && "novel-suite-input--error"
                      }`}
                    />
                  </div>
                  <div className="mt-1">
                    <Input
                      inputLabel="Password*"
                      inputLabelClasses="fw-normal"
                      type="password"
                      errorText={password.errorText ? password.errorText : ""}
                      name="password"
                      onChange={onChangePassword}
                      value={password.value}
                      className={`h-full ${
                        password.errorText && "novel-suite-input--error"
                      }`}
                    />
                  </div>
                  <div className="mt-1">
                    <Input
                      inputLabel="Confirm Password*"
                      inputLabelClasses="fw-normal"
                      type="password"
                      errorText={
                        confirm_password.errorText
                          ? confirm_password.errorText
                          : ""
                      }
                      name="confirm_password"
                      onChange={onChangeConfirmPassword}
                      value={confirm_password.value}
                      className={`h-full ${
                        confirm_password.errorText && "novel-suite-input--error"
                      }`}
                    />
                  </div>
                  <div className="d-flex">
                    <Button
                      type="submit"
                      className="novel-button--secondary-text novel-button--small mt-1 mr-auto ml-auto"
                      onClick={onClickPerviousHandler}
                      buttonLabel="Previous"
                    />
                    <Button
                      type="submit"
                      className="novel-button--primary novel-button--small mt-1 ml-auto mr-auto"
                      buttonLabel="Sign Up"
                      onClick={onSignUpHandler}
                    />
                  </div>
                </form>
              </Fragment>
            ) : null}
            <div className="text-center">
              <a
                href="/login"
                className="novel-button mt-1 novel-button--link novel-button--small ml-auto"
              >
                Already Have a Account
              </a>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default SignUpPage;
