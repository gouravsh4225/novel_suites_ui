import React, { useRef, useEffect } from "react";
import useOutSideClicked from "../../Hooks/useOutSideClicked/useOutSideClicked";

const OutSideClicked = ({ onClikcedOutSide, children, className }) => {
  const wrapperRef = useRef(null);
  const { isClicked } = useOutSideClicked(wrapperRef);
  useEffect(() => {
    if (isClicked) {
      if (onClikcedOutSide) {
        onClikcedOutSide(isClicked);
      }
    }
  }, [isClicked]);
  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default OutSideClicked;
