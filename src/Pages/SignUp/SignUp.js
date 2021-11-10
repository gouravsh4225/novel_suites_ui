import React, { Fragment, useState } from "react";
import NovelSuitesInput from "../../SharedComponents/UI_Elements/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesButton from "../../SharedComponents/UI_Elements/NovelSuitesButton/NovelSuitesButton";
import "./SignUp.scss";
import NovelDialog from "../../SharedComponents/UI_Elements/NovelDialog/NovelDialog";

const SignUp = () => {
  const [loginForm, setLoginForm] = useState({
    phone_number: {
      value: "",
      errorText: "",
    },
    password: {
      value: "",
      errorText: "",
    },
  });
  const onChangePhoneNumber = (e) => {
    const { phone_number } = loginForm;
    const { value } = e.target;
    if (value && value.length < 10) {
      phone_number.errorText = "";
      phone_number.value = value;
    } else {
      phone_number.errorText = "Phone Number is required";
      phone_number.value = value;
    }

    setLoginForm({
      ...loginForm,
      phone_number,
    });
  };
  const onChangePassword = (e) => {
    const { password } = loginForm;
    const { value } = e.target;
    if (value) {
      password.errorText = "";
      password.value = value;
    } else {
      password.errorText = "Password is required";
      password.value = value;
    }

    setLoginForm({
      ...loginForm,
      password,
    });
  };
  const onLoginFormSubmit = (event) => {
    event.preventDefault();
  };
  const onSignUpHandler = () => {
    console.log("cliced");
  };
  return (
    <Fragment>
      <NovelDialog>
        <div className="signup-container">
          <h3>Sign Up</h3>
          <form onSubmit={onLoginFormSubmit} autocomplete="off">
            <NovelSuitesInput
              inputLabel="Enter Your Phone Number"
              validatior={["isRequires"]}
              type="number"
              errorText={loginForm.phone_number.errorText}
              name="phone_number"
              onChange={(e) => onChangePhoneNumber(e)}
              value={loginForm.phone_number.value}
              className="novel-suite-input--small"
              autoFocus={true}
            />
            <NovelSuitesInput
              inputLabel="Enter Your Phone Number"
              validatior={["isRequires"]}
              type="password"
              errorText={loginForm.password.errorText}
              name="phone_number"
              onChange={(e) => onChangePassword(e)}
              value={loginForm.password.value}
              className="novel-suite-input--small"
            />
            <div
              className="login-forgot-password"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <a href="" className="text-decoration-none">
                Forgot Password
              </a>
            </div>
            <NovelSuitesButton
              buttonLabel="Sign IN"
              type="submit"
              className="novel-button--primary novel-button--block mt-1"
            ></NovelSuitesButton>
          </form>
          <div className="sign-up-container mt-1 text-center">
            <p className="sign-up-heading">
              Don't have an account?{" "}
              <span onClick={onSignUpHandler}>Sign Up</span>
            </p>
          </div>
        </div>
      </NovelDialog>
    </Fragment>
  );
};

export default SignUp;
