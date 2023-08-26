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

const addOverFlowYHiddenBody = () => {
  if (!document.body.classList.contains("overflow-y-hidden")) {
    document.body.classList.add("overflow-y-hidden");
  }
};

const removeOverFlowYHiddenBody = () => {
  document.body.classList.remove("overflow-y-hidden");
};

const UIElementHelper = {
  getllClasses,
  addOverFlowYHiddenBody,
  removeOverFlowYHiddenBody,
};

export default UIElementHelper;
