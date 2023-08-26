import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getUserCartDetailsByCartId,
  getRoomByLocationIdAndRoomId,
} from "../../../Services/NovelRoomService/NovelRoomService";
import WorkUnderProcess from "../../../Components/WorkUnderProcess/WorkUnderProcess";
import { Card } from "../../../UI_Library/UI_Library";
import "./NovelRoomCheckout.scss";

const NovelRoomCheckOut = () => {
  const [cartData, setCartData] = useState([]);
  const { id } = useParams();
  const getCartDetailsById = () => {
    getUserCartDetailsByCartId(id)
      .then((cartResponse) => {
        const { response } = cartResponse;
        const { data, errors } = response;
        if (data && Array.isArray(data) && !errors.length) {
          setCartData(data[0]);
        }
        console.log(cartResponse, "Response", response);
      })
      .catch((cartError) => {});
  };
  useEffect(() => {
    getCartDetailsById();
  }, [id]);

  return (
    <div className="novel-room-checkout-wrapper">
      <h3 className="text-center fw-normal fs-textXl mb-1">Your Cart</h3>
      <div className="container">
        <div className="grid-container grid-gap-1 novel-room-grid">
          <Card>
            <Card.Content className="m-0">Content</Card.Content>
          </Card>
          <Card>
            <Card.Content className="m-0">Summary Details</Card.Content>
          </Card>
        </div>
      </div>
      <WorkUnderProcess />
    </div>
  );
};
export default NovelRoomCheckOut;
