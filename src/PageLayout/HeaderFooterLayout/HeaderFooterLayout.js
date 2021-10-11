import React, { Fragment } from "react";
import NovelSuiteHeader from "../../SharedComponents/NovelSuiteHeader/NovelSuiteHeader";
import NovelFooter from "../../SharedComponents/NovelFooter/NovelFooter";

const HeaderFooterLayout = (props) => {
  console.log(props, "prsp");
  return (
    <div>
      <NovelSuiteHeader />
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
