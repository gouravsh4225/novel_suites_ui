import React from "react";

const AppHeaderNavList = ({ navigationMenu, onClick }) => {
  const onClickedListItem = (event, naviagtionItem) => {
    onClick && onClick(event, naviagtionItem);
  };
  return (
    <ul className="app-header-lists">
      <nav className="app-header-nav">
        <ul className="app-header-lists">
          {navigationMenu.map((navigationItem) => (
            <li className="app-header-items" key={navigationItem.id}>
              <div
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

export default AppHeaderNavList;
