import React, { useRef, useEffect } from "react";
import useOutSideClicked from "../../Hooks/useOutSideClicked/useOutSideClicked";

const OutSideClicked = ({ onClikcedOutSide, children }) => {
  const wrapperRef = useRef(null);
  const { isClicked, ref } = useOutSideClicked(wrapperRef);

  useEffect(() => {
    if (isClicked) {
      if (onClikcedOutSide) {
        onClikcedOutSide(isClicked);
      }
    }
  }, [isClicked]);
  return <div ref={wrapperRef}>{children}</div>;
};

export default OutSideClicked;
