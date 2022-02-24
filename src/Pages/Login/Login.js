import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Input,
  Loader,
  Toast,
  Modal,
} from "../../UI_Library/UI_Library";
import AuthService from "../../Services/AuthService/AuthService";
import CommonUtlis from "../../Utils/CommonUtlis";
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
        Loader.hide();
        let { response } = res;
        CommonUtlis.setSessionUserItems(
          response.access_token,
          response.user_data
        );
        document.body.classList.remove("overflow-y-hidden");
        onClose();
      })
      .catch((error) => {
        Loader.hide();
        let { errors } = error.response;
        if (Array.isArray(errors)) {
          Toast.error(
            errors.map((item) => `${item.param}  ${item.msg},`).join(" ")
          );
        }
      });
  };
  const onSignUpHandler = () => {
    document.body.classList.remove("overflow-y-hidden");
    reactRouterHistory.push("/create-user");
  };

  return (
    <Fragment>
      <Modal onEscKeyClose={onClose} isOpen={isOpen} isOutSideClicked={false}>
        <Modal.Header
          headerHeading="Login"
          onCloseHandler={onClose}
          className="border-bottom-0"
        />
        <Modal.Content>
          <div className="login-container">
            <form onSubmit={onLoginFormSubmit} autoComplete="new-password">
              <Input
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
              <Input
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
              <Button
                buttonLabel="Login"
                type="submit"
                className="novel-button--primary novel-button--block mt-1"
                onClick={(event) => onLoginFormSubmit(event)}
              />
            </form>
            <div className="sign-up-container mt-1 text-center">
              <p className="sign-up-heading">
                Don't have an account?{" "}
                <span onClick={onSignUpHandler}>Sign Up</span>
              </p>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

export default Login;
