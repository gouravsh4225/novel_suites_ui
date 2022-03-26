import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AuthService from "../../../Services/AuthService/AuthService";
import CommonUtlis from "../../../Utils/CommonUtlis";
import { Loader, Input, Button, Toast } from "../../../UI_Library/UI_Library";
import "./LoginPage.scss";
import { getUserCartDetailsByCartId } from "../../../Services/NovelRoomService/NovelRoomService";

const LoginPage = () => {
  const { pathname, search } = useLocation();
  const loginPageRouter = useHistory();
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
    /**
     * check for User Valdidation
     */
    if (!phone_number.value || !password.value) {
      let message = "Please enter Phone number & Password";
      Toast.error(message);
      return;
    } else if (phone_number.value && !password.value) {
      Toast.error("Please enter Password");
      return;
    } else if (!phone_number.value && password.value) {
      Toast.error("Please enter Phone Number");
      return;
    }

    let loginFormObject = {
      phone_number: phone_number.value,
      password: password.value,
    };
    Loader.show();
    AuthService.loginSubmit(loginFormObject)
      .then((res) => {
        console.log(res, "response");
        Loader.hide();
        let { response } = res;
        CommonUtlis.setSessionUserItems(
          response.access_token,
          response.user_data
        );
        const checkRedirectPath = search ? search.split("?redirect=")[1] : "/";
        loginPageRouter.push(`${checkRedirectPath}`);
      })
      .catch((error) => {
        Loader.hide();
        console.log(error, "console.log(error)");
        let { errors } = error.response;
        if (Array.isArray(errors)) {
          Toast.error(
            errors.map((item) => `${item.param}  ${item.msg},`).join(" ")
          );
        }
      });
  };

  const onSignUpHandler = () => {
    loginPageRouter.push("/register");
  };

  const onForgotPasswordHandler = () => {
    loginPageRouter.push("/forgot-password");
  };

  return (
    <div className="login-wrapper">
      <section className="login-left-section mt-auto mb-auto">
        <div className="login-form mr-auto ml-auto">
          <p className="login-form--heading">Login to Your Account</p>
          <section className="login-form--inputs">
            <form
              onSubmit={onLoginFormSubmit}
              autoComplete="new-password"
              className="login-forms"
            >
              <Input
                inputLabel="Mobile Number"
                validatior={["isRequires"]}
                type="number"
                errorText={loginForm.phone_number.errorText}
                name="phone_number"
                onChange={(e) => onChangePhoneNumber(e)}
                value={loginForm.phone_number.value}
                className="novel-suite-input--large fs-textXl"
                autoFocus={true}
                inputLabelClasses="fw-bold"
                placeholder="9876543210"
              />
              <Input
                inputLabel="Password"
                validatior={["isRequires"]}
                type="password"
                errorText={loginForm.password.errorText}
                name="password"
                onChange={(e) => onChangePassword(e)}
                value={loginForm.password.value}
                className="novel-suite-input--large"
                inputLabelClasses="fw-bold"
                errorTextClasses="mb-1"
              />
              <div className="d-flex flex-align-center login-actions-section mt-1">
                <div className="d-flex grid-gap-1 flex-1">
                  <span
                    onClick={onSignUpHandler}
                    className="ml-5px fs-textMd cursor-pointer text-decoration-none fw-semibold"
                    title="Sign Up"
                    tabIndex="0"
                  >
                    Register
                  </span>
                  <span
                    className="cursor-pointer fw-normal text-decoration-none"
                    onClick={onForgotPasswordHandler}
                    title="Forgot Password"
                    tabIndex="0"
                  >
                    Forgot Password?
                  </span>
                </div>
                <Button
                  buttonLabel="Login"
                  type="submit"
                  className="novel-button--primary login-actions-section--login-button"
                  onClick={(event) => onLoginFormSubmit(event)}
                />
              </div>
            </form>
          </section>
        </div>
      </section>
      <section className="login-rigth-section"></section>
    </div>
  );
};

export default LoginPage;
