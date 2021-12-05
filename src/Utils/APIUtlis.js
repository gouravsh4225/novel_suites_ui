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
  return fetch(getFullServerEndPoints(url), body, getApiHeaders)
    .then(handleResponse)
    .then(handleSuccessReponse)
    .catch(handleErrorResponse);
};
const deleteApi = (url) => {
  return fetch(getFullServerEndPoints(url), deleteApiHeaders)
    .then(handleResponse)
    .then(handleSuccessReponse)
    .catch(handleErrorResponse);
};

const postApi = (url, data = {}) => {
  return fetch(getFullServerEndPoints(url), {
    method: "POST",
    ...postApiHeaders,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then(handleSuccessReponse)
    .catch(handleErrorResponse);
};
const updateApi = (url, body = {}) => {
  return fetch(getFullServerEndPoints(url))
    .then(handleResponse)
    .then(handleSuccessReponse)
    .catch(handleErrorResponse);
};

const handleResponse = (response) => {
  return response.json().then((json) => {
    // Modify response to include status ok, success, and status text
    let modifiedJson = {
      success: response.ok,
      status: response.status,
      statusText: response.statusText ? response.statusText : json.error || "",
      response: json,
    };
    // If request failed, reject and return modified json string as error
    if (!modifiedJson.success)
      return Promise.reject(JSON.stringify(modifiedJson));

    // If successful, continue by returning modified json string
    return modifiedJson;
  });
};

const handleSuccessReponse = (data) => {
  return data;
};
const handleErrorResponse = (error) => {
  return Promise.reject(typeof error === "string" ? JSON.parse(error) : error);
};

const APIUtlis = {
  getApi,
  postApi,
  updateApi,
  deleteApi,
  handleErrorResponse,
  handleResponse,
  handleSuccessReponse,
};
export { APIUtlis };
