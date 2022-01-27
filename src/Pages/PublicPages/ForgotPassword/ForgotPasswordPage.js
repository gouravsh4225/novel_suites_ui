import React, { useState } from "react";
import { Input, Button } from "../../../UI_Library/UI_Library";
import "./ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const [forgotPasswordForms, setForgotPasswordForm] = useState({
    phone_number: {
      vallue: "",
      errorText: "",
    },
  });
  const onForgotPasswordFormSubmit = (event) => {
    console.log("hey");
  };

  const onChangePhoneNumber = (event) => {};

  return (
    <div className="forgot-password-wrapper pos-relative">
      <section className="forgot-password-section mt-auto mb-auto">
        <div className="forgot-password mr-auto ml-auto">
          <p className="forgot-password--heading">Forgot Password</p>
          <section className="forgot-password--inputs">
            <form
              onSubmit={onForgotPasswordFormSubmit}
              autoComplete="new-password"
              className="forgot-forms"
            >
              <Input
                inputLabel="Mobile Number"
                validatior={["isRequires"]}
                type="number"
                errorText={forgotPasswordForms.phone_number.errorText}
                name="phone_number"
                onChange={(e) => onChangePhoneNumber(e)}
                value={forgotPasswordForms.phone_number.value}
                className="novel-suite-input--large fs-textXl"
                autoFocus={true}
                inputLabelClasses="fw-bold"
              />
              <div className="text-center">
                <Button
                  buttonLabel="Forgot Password"
                  type="submit"
                  className="mt-1 novel-button--primary"
                  onClick={(event) => onForgotPasswordFormSubmit(event)}
                />
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
