import React from "react";
import NovelSuiteHeader from "../../SharedComponents/NovelSuiteHeader/NovelSuiteHeader";
import NovelFooter from "../../SharedComponents/NovelFooter/NovelFooter";
import NovelCopyRight from "../../SharedComponents/NovelCopyRight/NovelCopyRight";

const HeaderFooterLayout = (props) => {
  return (
    <div className="header-footer-layout-wrapper">
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
