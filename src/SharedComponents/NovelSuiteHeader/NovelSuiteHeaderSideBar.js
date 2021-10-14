import React from "react";
import NovelSuiteHeaderNavList from "./NovelSuiteHeaderNavList";

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
    <React.Fragment>
      <NovelSuiteHeaderNavList
        navigationMenu={menuList}
        onClick={onClickListItem}
      />
    </React.Fragment>
  );
};

export default NovelSuiteHeaderSideBar;
