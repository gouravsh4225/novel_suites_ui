import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import NovelDialog from "../../UI_Library/NovelDialog/NovelDialog";
import NovelSuitesInput from "../../UI_Library/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesButton from "../../UI_Library/NovelSuitesButton/NovelSuitesButton";
import { NovelLoader } from "../../UI_Library/NovelLoader/NovelLoader";
import AuthService from "../../Services/AuthService/AuthService";
import CommonUtlis from "../../Utils/CommonUtlis";
import NovelAlerts from "../../UI_Library/NovelAlerts/NovelAlerts";
import "./Login.scss";

const Login = ({ isOpen, onClose }) => {
  const reactRouterHistory = useHistory();
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
      NovelAlerts.error(message);
      return;
    } else if (phone_number.value && !password.value) {
      NovelAlerts.error("Please enter Password");
      return;
    } else if (!phone_number.value && password.value) {
      NovelAlerts.error("Please enter Phone Number");
      return;
    }

    let loginFormObject = {
      phone_number: phone_number.value,
      password: password.value,
    };
    NovelLoader.show();
    AuthService.loginSubmit(loginFormObject)
      .then((res) => {
        NovelLoader.hide();
        let { response } = res;
        CommonUtlis.setSessionUserItems(response);
        onClose();
      })
      .catch((error) => {
        NovelLoader.hide();
        let { errors } = error.response;
        if (Array.isArray(errors)) {
          NovelAlerts.error(
            errors.map((item) => `${item.param}  ${item.msg},`).join(" ")
          );
        }
      });
  };
  const onSignUpHandler = () => {
    reactRouterHistory.push("/create-user");
  };

  return (
    <Fragment>
      <NovelDialog
        onEscKeyClose={onClose}
        isOpen={isOpen}
        isOutSideClicked={false}
      >
        <NovelDialog.Header
          headerHeading="Login"
          onCloseHandler={onClose}
          className="border-bottom-0"
        />
        <NovelDialog.Content>
          <div className="login-container">
            <form onSubmit={onLoginFormSubmit} autoComplete="new-password">
              <NovelSuitesInput
                inputLabel="Enter Your Phone Number"
                validatior={["isRequires"]}
                type="text"
                errorText={loginForm.phone_number.errorText}
                name="phone_number"
                onChange={(e) => onChangePhoneNumber(e)}
                value={loginForm.phone_number.value}
                className="novel-suite-input--small"
                autoFocus={true}
              />
              <NovelSuitesInput
                inputLabel="Enter Your Password"
                validatior={["isRequires"]}
                type="password"
                errorText={loginForm.password.errorText}
                name="password"
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
        </NovelDialog.Content>
      </NovelDialog>
    </Fragment>
  );
};

export default Login;
