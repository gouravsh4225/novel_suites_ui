import React from "react";
import NovelSuiteHeaderNavList from "./NovelSuiteHeaderNavList";
import OutSideClicked from "../OutSideClicked/OutSideClicked";

const NovelSuiteHeaderSideBar = ({
  menuList,
  onClickListItem,
  onClikcedOutSide,
}) => {
  const onClick = (currentValue) => {
    if (currentValue) {
      onClikcedOutSide(currentValue);
    }
  };

  return (
    <OutSideClicked onClikcedOutSide={onClick}>
      <NovelSuiteHeaderNavList
        navigationMenu={menuList}
        onClick={onClickListItem}
      />
    </OutSideClicked>
  );
};

export default NovelSuiteHeaderSideBar;
