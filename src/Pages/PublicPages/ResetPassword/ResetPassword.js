import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthService from "../../../Services/AuthService/AuthService";
import { Button, Card, Input, Toast } from "../../../UI_Library/UI_Library";
import { CompareTwoString } from "../../../Utils/FormValidationUtlis";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const history = useHistory();
  const browserLocation = useParams();

  const getInitialResetFormState = () => {
    let formObjects = {
      phone_number: {
        value: atob(browserLocation.number),
        errorText: "",
      },
      new_password: {
        value: "",
        errorText: "",
      },
      confirm_password: {
        value: "",
        errorText: "",
      },
    };
    return { ...formObjects };
  };

  const [resetPasswordForm, setResetPasswordForm] = useState(
    getInitialResetFormState()
  );

  const onFormSubmitHandler = (e) => {
    const { phone_number, confirm_password, new_password } = resetPasswordForm;
    if (
      !phone_number.value &&
      !confirm_password.new_password &&
      !new_password.value
    ) {
      Toast.error("All Fields are mandatory");
      return;
    }
    const isBothPasswordEqual = CompareTwoString(
      confirm_password.value,
      new_password.value
    );
    if (!isBothPasswordEqual) {
      Toast.error("Password should be matched");
      return;
    }
    console.log(phone_number, confirm_password, new_password);
    let newPasswordJson = {
      phone_number: phone_number.value,
      new_password: new_password.value,
    };
    AuthService.forgotPassword(newPasswordJson)
      .then((response) => {
        console.log(response, "response");
        Toast.success("Password is changed successfully");
        history.push("/");
      })
      .catch((error) => {
        console.log("Got Some error");
      });
  };

  /** Form Function Start here */
  const onChangeConfirmPasswordHandler = (e, value) => {
    const { confirm_password } = resetPasswordForm;
    confirm_password.value = value;
    confirm_password.errorText = !value ? "Confirm Password is required" : "";
    setResetPasswordForm({
      ...resetPasswordForm,
      confirm_password,
    });
  };
  const onChangeNewPasswordHandler = (e, value) => {
    const { new_password } = resetPasswordForm;
    new_password.value = value;
    new_password.errorText = !value ? "New Password is required" : "";
    setResetPasswordForm({
      ...resetPasswordForm,
      new_password,
    });
  };

  const { confirm_password, new_password } = resetPasswordForm;

  return (
    <div className="reset-password-page">
      <div className="container pblock-1">
        <Card className="ml-auto mt-auto mr-auto reset-password--container">
          <Card.Content>
            <h3 className="fw-semibold text-uppercase text-center fs-textXl">
              Reset Your Password
            </h3>
            <form role="form" onSubmit={onFormSubmitHandler}>
              <div className="mt-1">
                <Input
                  inputLabel="New Password"
                  inputLabelClasses="fw-semibold"
                  type="password"
                  errorText={new_password.errorText}
                  name="new_password"
                  onChange={onChangeNewPasswordHandler}
                  value={new_password.value}
                  className="novel-suite-input--large fs-textXl"
                  autoFocus={true}
                />
              </div>
              <div className="mt-1">
                <Input
                  inputLabel="Confirm Password"
                  inputLabelClasses="fw-semibold"
                  type="password"
                  errorText={confirm_password.errorText}
                  name="new_password"
                  onChange={onChangeConfirmPasswordHandler}
                  value={confirm_password.value}
                  className="novel-suite-input--large fs-textXl"
                />
              </div>
              <div className="d-flex mt-1">
                <Button
                  className="novel-button--primary"
                  buttonLabel="Reset Password"
                  type="submit"
                  onClick={onFormSubmitHandler}
                />
                <a
                  href="/login"
                  className="novel-button novel-button--link ml-auto"
                >
                  Login
                </a>
              </div>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
