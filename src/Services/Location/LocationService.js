import { APIUtlis } from "../../Utils/APIUtlis";

const getAllLocation = () => {
  return APIUtlis.getApi("locations")
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

const checkAvailablity = ({ locationId, start_date, end_date }) => {
  const url = `rooms/check-room?${locationId}/${start_date}/${end_date}`;
  return APIUtlis.getApi(url)
    .then(APIUtlis.handleSuccessReponse)
    .catch(APIUtlis.handleErrorResponse);
};

export { getAllLocation, checkAvailablity };
