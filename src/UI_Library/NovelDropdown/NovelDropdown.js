import React, { useState, useEffect, useRef, Fragment } from "react";
import UIElementHelper from "../UI_Element_helpers";
import OutSideClicked from "../../SharedComponents/OutSideClicked/OutSideClicked";
import "./NovelDropdown.scss";
import NovelSuitesLabel from "../NovelSuitesLabel/NovelSuitesLabel";

const addAllSelectCssClasses = (initialClass, propsClass) => {
  return UIElementHelper.getllClasses(initialClass, propsClass);
};

const NovelDropdownItems = ({
  items = [],
  onClickItem,
  keyId,
  keyLabel,
  keyValue,
  openItems,
  className,
  selectValue,
}) => {
  const createAllCssClass = (listItem) => {
    if (selectValue) {
      console.log(selectValue, "--in list item");
      if (selectValue.toUpperCase() === listItem[keyLabel].toUpperCase()) {
        return addAllSelectCssClasses(
          "novel-dd-item",
          "novel-dd-item--selected",
          className
        );
      }
    }
    return addAllSelectCssClasses("novel-dd-item", className);
  };
  return (
    <Fragment>
      {items.map((item) => (
        <li
          className={createAllCssClass(item)}
          value={item[keyLabel]}
          key={item[keyId]}
          onClick={(e) => onClickItem(e, item[keyLabel])}
          onKeyPress={(e) => onClickItem(e, item[keyLabel])}
          role="listitem"
          tabIndex="0"
        >
          {item[keyLabel]}
        </li>
      ))}
    </Fragment>
  );
};

const DrowdownIcon = ({ toggleDropDownListHandler, isOpenList }) => {
  return (
    <Fragment>
      {isOpenList ? (
        <span
          className="novel-dd-toggle-icon fa fa-angle-up"
          onClick={toggleDropDownListHandler}
        ></span>
      ) : (
        <span
          className="novel-dd-toggle-icon fa fa-angle-down"
          onClick={toggleDropDownListHandler}
        ></span>
      )}
    </Fragment>
  );
};

const NovelDropdown = ({
  className,
  items = [],
  name,
  placeholder,
  required = false,
  keyValue,
  onChange,
  keyId,
  value,
  keyLabel,
  label,
  ...rest
}) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  /***
   * Set Default Props for Web Accessibility
   */
  const defaultNovelSelectProps = {
    "arial-label": name,
    required: required,
    placeholder: placeholder,
    ...rest,
  };

  const onChangeSelectValue = (event, targetValue) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectValue(targetValue);
    toggleDropDownListHandler();
    if (onChange) {
      let findSelectedValue = items.filter(
        (item) => item[keyLabel].toUpperCase() === targetValue.toUpperCase()
      );
      onChange(event, findSelectedValue.length ? findSelectedValue[0] : "");
    }
  };

  const toggleDropDownListHandler = () => {
    setIsOpenList(!isOpenList);
  };

  const onResetValue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectValue("");
    setIsOpenList(false);
  };

  const onClickOutSideHandler = () => {
    setIsOpenList(false);
  };

  return (
    <div
      className={addAllSelectCssClasses("novel-dd-root", className)}
      tabIndex="0"
    >
      <NovelSuitesLabel
        labelName={label}
        isCenter={false}
        className="fw-bold"
      />
      <div className="novel-dd-header">
        <span className="novel-dd-title" onClick={toggleDropDownListHandler}>
          {selectValue ? selectValue : placeholder}
        </span>
        {selectValue ? (
          <span
            className="novel-dd-toggle-icon fa fa-times-circle"
            aria-hidden="true"
            onClick={onResetValue}
          ></span>
        ) : null}

        <DrowdownIcon
          toggleDropDownListHandler={toggleDropDownListHandler}
          isOpenList={isOpenList}
        />
      </div>
      <ul
        className={addAllSelectCssClasses(
          "novel-dd-list",
          isOpenList ? "novel-dd-list--show" : "novel-dd-list--hide"
        )}
        role="list"
        tabIndex="0"
      >
        {isOpenList ? (
          <OutSideClicked onClikcedOutSide={onClickOutSideHandler}>
            <NovelDropdownItems
              items={items}
              keyValue={keyValue}
              keyId={keyId}
              keyLabel={keyLabel}
              onClickItem={onChangeSelectValue}
              openItems={isOpenList}
              selectValue={selectValue}
            />
          </OutSideClicked>
        ) : null}
      </ul>
    </div>
  );
};

export default NovelDropdown;
