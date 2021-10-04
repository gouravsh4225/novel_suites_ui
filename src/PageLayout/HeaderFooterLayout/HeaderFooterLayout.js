import React, { Fragment } from "react";
import AppHeader from "../../SharedComponents/AppHeader/AppHeader";

const HeaderFooterLayout = (props) => {
  return (
    <Fragment>
      <AppHeader />
      {props.component && (
        <main>
          <props.component />
        </main>
      )}
      <footer>Footer Will come later</footer>
    </Fragment>
  );
};

export default HeaderFooterLayout;
