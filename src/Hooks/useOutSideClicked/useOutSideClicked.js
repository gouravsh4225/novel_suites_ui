import { useEffect, useState } from "react";

const useOutSideClicked = (ref) => {
  const [isOutsideClicked, setIsOutsideClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOutsideClicked(true);
      } else {
        setIsOutsideClicked(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return { isClicked: isOutsideClicked };
};

export default useOutSideClicked;
