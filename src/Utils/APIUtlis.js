const getApiHeaders = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const postApiHeaders = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const deleteApiHeaders = {
  method: "delete",
};

const getFullServerEndPoints = (url) => {
  return `${process.env.REACT_APP_API_ENDPOINT}${url}`;
};

const getApi = (url, body = {}) => {
  return fetch(getFullServerEndPoints(url), body, getApiHeaders);
};
const deleteApi = (url) => {
  return fetch(getFullServerEndPoints(url), deleteApiHeaders);
};

const postApi = (url, body = {}) => {
  return fetch(
    getFullServerEndPoints(url),
    JSON.stringify(body),
    postApiHeaders
  );
};

const updateApi = (url, body = {}) => {
  return fetch(getFullServerEndPoints(url));
};
export { getApi, updateApi, postApi, deleteApi };
