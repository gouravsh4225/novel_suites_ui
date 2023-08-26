import React, { Fragment, useState, useEffect } from "react";
import UIElementHelper from "../UI_Element_helpers";
import "./NovelCarousel.scss";

const getAllCourselClass = (initalClass, propsClass) => {
  return UIElementHelper.getllClasses(initalClass, propsClass);
};

const NovelCarouselItem = ({
  item,
  className,
  style,
  altTitle,
  children,
  ...rest
}) => {
  return (
    <Fragment>
      <img
        src={item}
        alt={altTitle ? altTitle : ""}
        className="novel-carousel-image image-fit-cover"
      />
      {children}
    </Fragment>
  );
};

const NovelCarousel = ({
  items,
  className,
  style,
  children,
  imageKey,
  intervalTime = false,
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  let setIntervalId;

  useEffect(() => {
    if (intervalTime) {
      setIntervalId = setInterval(showImageOnIntervalTime, intervalTime);
    }
    return () => {
      clearInterval(setIntervalId);
    };
  }, []);

  if (!Array.isArray(items)) {
    return null;
  }

  const showImageOnIntervalTime = () => {
    setCurrentPage((currentPage) =>
      currentPage < items.length - 1 ? currentPage + 1 : 0
    );
  };

  const onSelectImage = (e, index) => {
    setCurrentPage(index);
  };

  return (
    <div className="novel-carousel-container">
      <div className="novel-carousel-items">
        {items.map((item, index) => (
          <Fragment key={index}>
            {currentPage === index ? (
              <NovelCarouselItem
                key={index}
                item={item[imageKey] ? item[imageKey] : item}
                className={currentPage === index ? "active-item" : ""}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className="novel-carousel-preview">
        {items.map((image, index) => (
          <div
            className="novel-carousel-preview--item"
            onClick={(e) => onSelectImage(e, index)}
            key={index}
          >
            <img
              src={image[imageKey] ? image[imageKey] : image}
              alt="he"
              className={`image-fit-cover ${
                currentPage === index ? "active-image" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const NovelCarouselContainer = (props) => {
  return <NovelCarousel {...props} />;
};

NovelCarouselContainer.CarouselItem = NovelCarouselItem;

export { NovelCarouselContainer };
