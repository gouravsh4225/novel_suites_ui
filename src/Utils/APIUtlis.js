const getApiHeaders = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const postApiHeaders = {
  headers: {
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

const postApi = (url, data) => {
  return fetch(getFullServerEndPoints(url), {
    method: "POST",
    ...postApiHeaders,
    body: JSON.stringify(data),
  });
};

const updateApi = (url, body = {}) => {
  return fetch(getFullServerEndPoints(url));
};
const APIUtlis = {
  getApi,
  postApi,
  updateApi,
  deleteApi,
};
export default APIUtlis;
