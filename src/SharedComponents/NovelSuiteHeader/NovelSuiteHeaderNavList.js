import React from "react";

const NovelSuiteHeaderNavList = ({ navigationMenu, onClick }) => {
  const onClickedListItem = (event, naviagtionItem) => {
    onClick && onClick(event, naviagtionItem);
  };
  return (
    <ul className="app-header-lists">
      <nav className="app-header-nav" role="navigation">
        <ul className="app-header-lists" role="list">
          {navigationMenu.map((navigationItem) => (
            <li
              className="app-header-items"
              key={navigationItem.id}
              role="listitem"
            >
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
    </ul>
  );
};

export default NovelSuiteHeaderNavList;
