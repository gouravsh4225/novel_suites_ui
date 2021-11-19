import APIUtlis from "../../Utils/APIUtlis";

const getAllLocation = () => {
  return APIUtlis.getApi("locations")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Found Some Error");
      }
    })
    .then((responseData) => {
      let { data } = responseData;
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export { getAllLocation };
