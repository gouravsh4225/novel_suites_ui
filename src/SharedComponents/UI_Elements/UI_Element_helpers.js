/**
 *@param initialClass , will added class
 * @function getllClasses
 * @returns normal classs and other classes into one string
 */
const getllClasses = (initalClasses, ...nextClasses) => {
  return nextClasses
    ? [initalClasses, ...nextClasses].join(" ").trim()
    : initalClasses;
};

const UIElementHelper = {
  getllClasses,
};

export default UIElementHelper;
