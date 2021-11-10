import React, { Fragment, useState } from "react";
import NovelDialog from "../../SharedComponents/UI_Elements/NovelDialog/NovelDialog";
import NovelSuitesInput from "../../SharedComponents/UI_Elements/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesButton from "../../SharedComponents/UI_Elements/NovelSuitesButton/NovelSuitesButton";
import AuthService from "../../Services/AuthService/AuthService";
import "./Login.scss";
import NovelLoader from "../../SharedComponents/NovelLoader/NovelLoader";

const Login = ({ isOpen, onClose }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const onChangePhoneNumber = (e) => {
    const { phone_number } = loginForm;
    const { value } = e.target;
    if (value && value.length < 11) {
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
    const { phone_number, password } = loginForm;
    let loginFormObject = {
      phone_number: phone_number.value,
      password: password.value,
    };
    setIsLoading(true);
    AuthService.loginSubmit(loginFormObject)
      .then((res) => {
        setIsLoading(false);
        console.log("respone in component", res);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, "erro");
      });
  };
  const onSignUpHandler = () => {
    console.log("cliced");
  };
  return (
    <Fragment>
      <NovelLoader isOpen={isLoading} />
      <NovelDialog onClose={onClose} isOpen={isOpen}>
        <div className="login-container">
          <h3>Log In</h3>
          <form onSubmit={onLoginFormSubmit} autoComplete="off">
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
              <a href="#" className="text-decoration-none">
                Forgot Password
              </a>
            </div>
            <NovelSuitesButton
              buttonLabel="Login"
              type="submit"
              className="novel-button--primary novel-button--block mt-1"
              onClick={(event) => onLoginFormSubmit(event)}
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

export default Login;
