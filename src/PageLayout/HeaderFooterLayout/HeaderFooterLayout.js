import React, { Fragment } from "react";
import NovelSuiteHeader from "../../SharedComponents/NovelSuiteHeader/NovelSuiteHeader";
import NovelFooter from "../../SharedComponents/NovelFooter/NovelFooter";
import NovelCopyRight from "../../SharedComponents/NovelCopyRight/NovelCopyRight";

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
      <NovelCopyRight />
    </div>
  );
};

export default HeaderFooterLayout;
