import React, { useState } from "react";
import UserAvatarLogo from "../../assets/user-avatar.png";
import { Toastr, Menu } from "../../UI_Library/UI_Library";
import AuthService from "../../Services/AuthService/AuthService";
import "./UserProfile.scss";
import CommonUtlis from "../../Utils/CommonUtlis";

const getUserProfileMenuList = () => {
  return [
    { itemLabel: "My Account", componentUrl: "/user-account", id: 1 },
    { itemLabel: "My Booking", componentUrl: "/user-bookings", id: 2 },
    { itemLabel: "Logout", id: 3 },
  ];
};

const UserProfile = ({ className }) => {
  const [isMenuElementOpen, setisMenuElementOpen] = useState(null);
  const openProfileMenu = (e) => {
    setisMenuElementOpen(e.currentTarget);
  };

  const closeMenu = () => {
    setisMenuElementOpen(null);
  };

  const onMenuItemHandler = (e, selectedItem) => {
    console.log(selectedItem, "selectedItem");
    if (selectedItem.componentUrl) {
      // To do
      Toastr.info("Feature will come in next release");
    } else {
      AuthService.logOutUser().then((res) => {
        window.location.reload();
      });
    }
    setisMenuElementOpen(null);
  };

  const getLoggedInUserDetails = () => {
    let loggedUserData = JSON.parse(CommonUtlis.getSessionUserDetails());
    if (loggedUserData) {
      let { name } = loggedUserData;
      return (
        <div
          className="user-profile-para"
          title={name}
          onClick={openProfileMenu}
        >
          {name}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${className} user-profile-wrapper`}>
      <div className="user-profile-image" onClick={openProfileMenu}>
        <img src={UserAvatarLogo} />
      </div>
      {getLoggedInUserDetails()}
      <Menu
        isOpen={Boolean(isMenuElementOpen)}
        targetElement={isMenuElementOpen}
        onClose={closeMenu}
      >
        {getUserProfileMenuList().map((menuItem, index) => (
          <Menu.MenuItem
            onClickItem={(e) => onMenuItemHandler(e, menuItem)}
            key={index}
          >
            {menuItem.itemLabel}
          </Menu.MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UserProfile;
