import React, { Fragment } from "react";
import AppHeader from "../../SharedComponents/AppHeader/AppHeader";
import NovelFooter from "../../SharedComponents/NovelFooter/NovelFooter";

const HeaderFooterLayout = (props) => {
  console.log(props, "prsp");
  return (
    <div>
      <AppHeader />
      {props.component && (
        <main>
          <props.component />
        </main>
      )}
      <NovelFooter />
    </div>
  );
};

export default HeaderFooterLayout;
