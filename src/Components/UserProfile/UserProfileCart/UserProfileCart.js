import React, { useEffect, useState } from "react";
import AuthService from "../../../Services/AuthService/AuthService";
import { Card } from "../../../UI_Library/UI_Library";
import WorkUnderProcess from "../../WorkUnderProcess/WorkUnderProcess";

const UserProfileCart = () => {
  const [userCarts, setUserCarts] = useState([]);

  useEffect(() => {
    AuthService.getUserCartDetails()
      .then((cartResponse) => {
        let { data } = cartResponse.response;
        if (data && Array.isArray(data) && data.length) {
          setUserCarts(data);
        }
      })
      .catch((cartError) => {
        console.log(cartError, "cartError");
      });
  }, []);
  return (
    <div>
      User Cart working
      <div className="container">
        <div className="grid-container grid-gap-1">
          {userCarts.map((cartItem) => {
            let { cart_details } = cartItem;
            console.log("card_--", cart_details);
            return (
              <Card key={cartItem._id}>
                <Card.Content>hey</Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
      <WorkUnderProcess />
    </div>
  );
};

export default UserProfileCart;
