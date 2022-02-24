import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Toast } from "../../../UI_Library/UI_Library";
// import logo from "../../../assets/logo_novel_png.png";
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
  });

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

  const { phone_number, name, email_address, password, confirm_password } =
    signUpFormInput;

  return (
    <Fragment>
      <div className="sign-up-wrapper">
        <section className="sign-up-left-section mt-auto mb-auto">
          <div className="sign-up-form mr-auto ml-auto">
            <p className="sign-up-form--heading">
              Create your Novel Suite Account
            </p>
            <form
              onSubmit={onSignUpHandler}
              autoComplete="off"
              className="sign-up-form--inputs"
            >
              <Input
                inputLabel="Mobile Number"
                inputLabelClasses="fw-bold"
                type="text"
                errorText={phone_number.errorText ? phone_number.errorText : ""}
                name="phone_number"
                onChange={onChangePhoneNumber}
                value={phone_number.value}
                className="novel-suite-input--large mb-1"
              />
              <Input
                inputLabel="Full Name"
                inputLabelClasses="fw-bold"
                type="text"
                errorText={!name.value ? name.errorText : ""}
                name="name"
                onChange={onChangeFullName}
                value={name.value}
                className="novel-suite-input--large mb-1"
              />
              <Input
                inputLabel="Email Address"
                inputLabelClasses="fw-bold"
                type="email"
                errorText={
                  email_address.errorText ? email_address.errorText : ""
                }
                name="email_address"
                onChange={onChangeEmailAddress}
                value={email_address.value}
                className={`novel-suite-input--large mb-1 ${
                  email_address.errorText && "novel-suite-input--error"
                }`}
              />
              <Input
                inputLabel="Password"
                inputLabelClasses="fw-bold"
                type="password"
                errorText={password.errorText ? password.errorText : ""}
                name="password"
                onChange={onChangePassword}
                value={password.value}
                className={`novel-suite-input--large mb-1 ${
                  password.errorText && "novel-suite-input--error"
                }`}
              />
              <Input
                inputLabel="Confirm Password"
                inputLabelClasses="fw-bold"
                type="password"
                errorText={
                  confirm_password.errorText ? confirm_password.errorText : ""
                }
                name="confirm_password"
                onChange={onChangeConfirmPassword}
                value={confirm_password.value}
                className={`novel-suite-input--large mb-1 ${
                  confirm_password.errorText && "novel-suite-input--error"
                }`}
              />
              <Button
                type="submit"
                className="novel-button--primary novel-button--block novel-button--small mt-1"
                buttonLabel="Sign Up"
                onClick={onSignUpHandler}
              />
            </form>
            <div className="text-center mt-1">
              <a
                href="/login"
                className="text-center text-decoration-none mt-1 text-archor-color cursor-pointer"
              >
                Already Have a Account
              </a>
            </div>
          </div>
        </section>
        <section className="sign-up-right-section"></section>
        {/* <div className="sign-card">
          <div className="sign-container">
            <div className="sign-up-form-container">
              <div className="form-heading mb-1">
                <h3 className="mt-1 form-title">welcome </h3>
                <h5 className="form-sub-title">
                  Create your Novel Suite account
                </h5>
              </div>
              <form
                onSubmit={onSignUpHandler}
                autoComplete="off"
                className="sign-up-form"
              >
                <Input
                  inputLabel="Enter Your Phone Number"
                  inputLabelClasses="fw-bold"
                  type="text"
                  errorText={
                    phone_number.errorText ? phone_number.errorText : ""
                  }
                  name="phone_number"
                  onChange={onChangePhoneNumber}
                  value={phone_number.value}
                  className="novel-suite-input--large mb-1"
                />
                <Input
                  inputLabel="Full Name"
                  inputLabelClasses="fw-bold"
                  type="text"
                  errorText={!name.value ? name.errorText : ""}
                  name="name"
                  onChange={onChangeFullName}
                  value={name.value}
                  className="novel-suite-input--large mb-1"
                />
                <Input
                  inputLabel="Email Address"
                  inputLabelClasses="fw-bold"
                  type="email"
                  errorText={
                    email_address.errorText ? email_address.errorText : ""
                  }
                  name="email_address"
                  onChange={onChangeEmailAddress}
                  value={email_address.value}
                  className={`novel-suite-input--large mb-1 ${
                    email_address.errorText && "novel-suite-input--error"
                  }`}
                />
                <Input
                  inputLabel="Password"
                  inputLabelClasses="fw-bold"
                  type="password"
                  errorText={password.errorText ? password.errorText : ""}
                  name="password"
                  onChange={onChangePassword}
                  value={password.value}
                  className={`novel-suite-input--large mb-1 ${
                    password.errorText && "novel-suite-input--error"
                  }`}
                />
                <Input
                  inputLabel="Comfirm Password"
                  inputLabelClasses="fw-bold"
                  type="password"
                  errorText={
                    confirm_password.errorText ? confirm_password.errorText : ""
                  }
                  name="confirm_password"
                  onChange={onChangeConfirmPassword}
                  value={confirm_password.value}
                  className={`novel-suite-input--large mb-1 ${
                    confirm_password.errorText && "novel-suite-input--error"
                  }`}
                />
                <Button
                  type="submit"
                  className="novel-button--primary novel-button--block novel-button--small mt-1"
                  buttonLabel="Sign Up"
                  onClick={onSignUpHandler}
                />
              </form>
            </div>
            <div className="sign-up-logo">
              <img src={logo} />
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};

export default SignUpPage;
