import React, { useState } from "react";
import UserAvatarLogo from "../../assets/user-avatar.png";
import NovelMenu from "../../UI_Library/NovelMenu/NovelMenu";
import "./UserProfile.scss";

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
    setisMenuElementOpen(null);
  };

  return (
    <div className={`${className} user-profile-wrapper`}>
      <div className="user-profile-image" onClick={openProfileMenu}>
        <img src={UserAvatarLogo} />
      </div>
      <NovelMenu
        isOpen={Boolean(isMenuElementOpen)}
        targetElement={isMenuElementOpen}
        onClose={closeMenu}
      >
        <NovelMenu.MenuItem onClickItem={onMenuItemHandler}>
          My Profile
        </NovelMenu.MenuItem>
        <NovelMenu.MenuItem onClickItem={onMenuItemHandler}>
          My Profile
        </NovelMenu.MenuItem>
        <NovelMenu.MenuItem onClickItem={onMenuItemHandler}>
          My Profile
        </NovelMenu.MenuItem>
        <NovelMenu.MenuItem onClickItem={onMenuItemHandler}>
          My Profile
        </NovelMenu.MenuItem>
      </NovelMenu>
    </div>
  );
};

export default UserProfile;
