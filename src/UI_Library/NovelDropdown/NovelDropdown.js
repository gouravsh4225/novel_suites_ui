import React, { useState, Fragment, useCallback } from "react";
import UIElementHelper from "../UI_Element_helpers";
import OutSideClicked from "../../SharedComponents/OutSideClicked/OutSideClicked";
import "./NovelDropdown.scss";
import NovelSuitesLabel from "../NovelSuitesLabel/NovelSuitesLabel";
import NovelBackDrop from "../NovelBackDrop/NovelBackDrop";
import NovelSpinnerLoader from "../NovelSpinnerLoader/NovelSpinnerLoader";

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
  isLoading,
}) => {
  const createAllCssClass = (listItem) => {
    if (selectValue) {
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
      {isLoading ? (
        <li className={addAllSelectCssClasses("p-1", className)}>
          <NovelSpinnerLoader />
        </li>
      ) : null}
      {!isLoading &&
        items.map((item) => (
          <li
            className={createAllCssClass(item)}
            value={item[keyLabel]}
            key={item[keyId]}
            onClick={(e) => onClickItem(e, item[keyLabel])}
            onKeyPress={(e) => onClickItem(e, item[keyLabel])}
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
  isLoading,
  ...rest
}) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [selectValue, setSelectValue] = useState("");

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
    onChange(e, "");
  };

  const onClickOutSideHandler = () => {
    setIsOpenList(false);
  };

  const getParentWidth = useCallback(() => {
    const rootListElement = document.getElementById("ul-list");
    if (rootListElement) {
      return {
        width: `${rootListElement.offsetWidth}px`,
      };
    }
  }, []);

  return (
    <div
      className={addAllSelectCssClasses("novel-dd-root", className)}
      tabIndex="0"
      id="ul-list"
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
            className="novel-dd-toggle-icon fa fa-times-circle clear-value"
            aria-hidden="true"
            onClick={onResetValue}
          ></span>
        ) : null}

        <DrowdownIcon
          toggleDropDownListHandler={toggleDropDownListHandler}
          isOpenList={isOpenList}
        />
      </div>
      {isOpenList ? <NovelBackDrop className="bg-transparent" /> : null}
      <ul
        className={addAllSelectCssClasses(
          "novel-dd-list",
          isOpenList ? "novel-dd-list--show" : "novel-dd-list--hide"
        )}
        tabIndex="0"
        style={getParentWidth()}
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
              isLoading={isLoading}
            />
          </OutSideClicked>
        ) : null}
      </ul>
    </div>
  );
};

export default NovelDropdown;
