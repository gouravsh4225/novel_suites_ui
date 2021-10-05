import React, { Fragment } from "react";
import AppHeader from "../../SharedComponents/AppHeader/AppHeader";
import NovelFooter from "../../SharedComponents/NovelFooter/NovelFooter";

const HeaderFooterLayout = (props) => {
  return (
    <Fragment>
      <AppHeader />
      {props.component && (
        <main>
          <props.component />
        </main>
      )}
      <NovelFooter />
    </Fragment>
  );
};

export default HeaderFooterLayout;
