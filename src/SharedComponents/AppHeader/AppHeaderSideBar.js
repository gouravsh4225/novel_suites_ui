import React from "react";
import AppHeaderNavList from "./AppHeaderNavList";
import OutSideClicked from "../OutSideClicked/OutSideClicked";

const AppHeaderSideBar = ({ menuList, onClickListItem, onClikcedOutSide }) => {
  const onClick = (currentValue) => {
    if (currentValue) {
      onClikcedOutSide(currentValue);
    }
  };

  return (
    <OutSideClicked onClikcedOutSide={onClick}>
      <AppHeaderNavList navigationMenu={menuList} onClick={onClickListItem} />
    </OutSideClicked>
  );
};

export default AppHeaderSideBar;
