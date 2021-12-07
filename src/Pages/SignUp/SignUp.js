import React, { Fragment, useState } from "react";
import NovelSuitesInput from "../../UI_Library/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesButton from "../../UI_Library/NovelSuitesButton/NovelSuitesButton";
import logo from "../../assets/logo_novel_png.png";
import {
  EmailValidationChecker,
  NumberValidationChecker,
} from "../../Utils/FormValidationUtlis";
import "./SignUp.scss";

const SignUpPage = () => {
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
  };

  const { phone_number, name, email_address, password, confirm_password } =
    signUpFormInput;

  return (
    <Fragment>
      <div className="sign-up-wrapper">
        <div className="sign-card">
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
                <NovelSuitesInput
                  inputLabel="Enter Your Phone Number"
                  inputLabelClasses="fw-bold"
                  type="text"
                  errorText={
                    phone_number.errorText ? phone_number.errorText : ""
                  }
                  name="phone_number"
                  onChange={onChangePhoneNumber}
                  value={phone_number.value}
                  className="novel-suite-input--large mblock-0"
                />
                <NovelSuitesInput
                  inputLabel="Full Name"
                  inputLabelClasses="fw-bold"
                  type="text"
                  errorText={!name.value ? name.errorText : ""}
                  name="name"
                  onChange={onChangeFullName}
                  value={name.value}
                  className="novel-suite-input--large mblock-0"
                />
                <NovelSuitesInput
                  inputLabel="Email Address"
                  inputLabelClasses="fw-bold"
                  type="email"
                  errorText={
                    email_address.errorText ? email_address.errorText : ""
                  }
                  name="email_address"
                  onChange={onChangeEmailAddress}
                  value={email_address.value}
                  className={`novel-suite-input--large mblock-0 ${
                    email_address.errorText && "novel-suite-input--error"
                  }`}
                />
                <NovelSuitesInput
                  inputLabel="Password"
                  inputLabelClasses="fw-bold"
                  type="password"
                  errorText={password.errorText ? password.errorText : ""}
                  name="password"
                  onChange={onChangePassword}
                  value={password.value}
                  className={`novel-suite-input--large mblock-0 ${
                    password.errorText && "novel-suite-input--error"
                  }`}
                />
                <NovelSuitesInput
                  inputLabel="Comfirm Password"
                  inputLabelClasses="fw-bold"
                  type="password"
                  errorText={
                    confirm_password.errorText ? confirm_password.errorText : ""
                  }
                  name="confirm_password"
                  onChange={onChangeConfirmPassword}
                  value={confirm_password.value}
                  className={`novel-suite-input--large mblock-0 ${
                    confirm_password.errorText && "novel-suite-input--error"
                  }`}
                />
                <NovelSuitesButton
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
        </div>
      </div>
    </Fragment>
  );
};

export default SignUpPage;
