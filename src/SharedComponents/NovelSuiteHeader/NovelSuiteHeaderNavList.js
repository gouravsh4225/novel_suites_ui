import React from "react";

const NovelSuiteHeaderNavList = ({ navigationMenu, onClick }) => {
  const onClickedListItem = (event, naviagtionItem) => {
    onClick && onClick(event, naviagtionItem);
  };
  return (
    <nav className="app-header-nav">
      <ul className="app-header-lists">
        {navigationMenu.map((navigationItem) => (
          <li className="app-header-items" key={navigationItem.id}>
            <div
              tabIndex="0"
              role="link"
              className="app-header-links"
              aria-label={navigationItem.label}
              onClick={(event) => onClickedListItem(event, navigationItem)}
            >
              {navigationItem.label}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NovelSuiteHeaderNavList;
