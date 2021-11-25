import React, { Fragment, useState, useEffect, useCallback } from "react";
import NovelDialog from "../../UI_Library/NovelDialog/NovelDialog";
import NovelDropdown from "../../UI_Library/NovelDropdown/NovelDropdown";
import { getAllLocation } from "../../Services/Location/LocationService";
import "./BookNow.scss";
import NovelSuitesInput from "../../UI_Library/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesButton from "../../UI_Library/NovelSuitesButton/NovelSuitesButton";

const getAllLocationData = () => {
  return [
    {
      location_id: 1,
      location_hotel_name: "Novel Suites",
      location_short_address: "DWARKA, DELHI",
      location_full_address:
        "PLOT - 339, BLOCK B, SEC - 19, DWARKA, NEW DELHI - 110075",
      contact_details: {
        email_address: "novelsuites@gmail.com",
        phone_number: "+918383019368",
      },
      location_address_imageurl:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
      location_room_type: [
        {
          type: "Deluxe",
          facilities: [],
          price: 2000,
          no_of_rooms: 10,
          id: "22",
        },
      ],
    },
    {
      location_id: 2,
      location_hotel_name: "Novel Suites",
      location_short_address: "KARNAL, Harayan",
      location_full_address:
        "PLOT - 339, BLOCK B, SEC - 19, DWARKA, NEW DELHI - 110075",
      contact_details: {
        email_address: "novelsuites@gmail.com",
        phone_number: "+918383019368",
      },
      location_address_imageurl:
        "https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg",
      location_room_type: [
        {
          type: "Deluxe",
          facilities: [],
          price: 2000,
          no_of_rooms: 10,
          id: "22",
        },
      ],
    },
  ];
};

const BookFormInitalData = () => {
  return {
    location: {
      value: "",
      errorText: "",
    },
    start_date: {
      value: "",
      errorText: "",
    },
    end_date: {
      value: "",
      errorText: "",
    },
  };
};

const BookNow = ({ isOpen, onClose }) => {
  const [locationList, setLocationList] = useState(getAllLocationData());
  const [bookFormInput, setBookFormInput] = useState({});
  const [loctionLoading, setLoctionLoading] = useState(true);

  useEffect(() => {
    setBookFormInput(BookFormInitalData());
    if (isOpen) {
      getAllLocationDetails();
    }
  }, [isOpen]);

  const getAllLocationDetails = () => {
    getAllLocation()
      .then((res) => {
        setLocationList(res);
        setLoctionLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoctionLoading(false);
      });
  };

  const onBookNowSubmit = (event) => {
    event.preventDefault();
    const { location, start_date, end_date } = bookFormInput;
    let errorFields = validateBookValid();
    let { isValid } = errorFields;
    if (isValid) {
      let checkAvailableJson = {
        start_date: start_date.value,
        end_date: end_date.value,
        locationId: location.value,
      };
      console.log(checkAvailableJson, "==>");
    } else {
      let message = "";
      for (const errorKey in errorFields) {
        if (errorKey !== "isValid") {
          message = `${message} ${errorFields[errorKey]}`;
        }
      }
      alert(message);
    }
    console.log(errorFields);
    // if (isValid) {
    //   let checkAvailableJson = {
    //     start_date,
    //     end_date,
    //     locationId: location.location_id,
    //   };
    //   console.log(checkAvailableJson, "==> checkAvailable");
    // }
  };

  const validateBookValid = () => {
    const { location, start_date, end_date } = bookFormInput;
    let errorFields = {
      isValid: false,
      location: "",
      start_date: "",
      end_date: "",
    };
    if (!location.value && !start_date.value && !end_date.value) {
      errorFields = {
        location: "Location is Required",
        start_date: "Start Date is Required",
        end_date: "End Date is Required",
        isValid: false,
      };
      return errorFields;
    } else {
      if (!location && !location.value) {
        errorFields = {
          ...errorFields,
          isValid: false,
          location: "Location is Required",
        };
        return errorFields;
      }
      if (start_date.value && end_date.value) {
        let isValid = validateDates(start_date.value, end_date.value);
        errorFields = {
          isValid,
        };
        return errorFields;
      } else {
        errorFields = {
          isValid: false,
          start_date: "Start Date is Required",
          end_date: "End Date is Required",
        };

        return errorFields;
      }
    }
    return errorFields;
  };

  const validateDates = (start_date, end_date) => {
    if (start_date && end_date) {
      if (Date.parse(end_date) >= Date.parse(start_date)) {
        return true;
      } else {
        alert("End Date should be equal or greater than start date");
      }
    } else {
      alert("Start Date and End date are Required");
      return false;
    }
  };

  const onChangeLocation = (event, value) => {
    const { location } = bookFormInput;
    location.value = value?.location_short_address;
    setBookFormInput({
      ...bookFormInput,
      location,
    });
  };

  const onChangeStartDateHandler = (event) => {
    const { value } = event.target;
    const { start_date } = bookFormInput;
    start_date.value = value;
    setBookFormInput({
      ...bookFormInput,
      start_date,
    });
  };

  const onChangeEndDateHandler = (event) => {
    const { value } = event.target;
    const { end_date } = bookFormInput;
    end_date.value = value;
    setBookFormInput({
      ...bookFormInput,
      end_date,
    });
  };

  const checkBookFormValid = useCallback(() => {
    const { location, start_date, end_date } = bookFormInput;
    return !![location, start_date, end_date].some(
      (items) => items && items.value && !items.value
    );
  }, [bookFormInput]);

  const { location, start_date, end_date } = bookFormInput;

  return (
    <Fragment>
      <NovelDialog onEscKeyClose={onClose} isOpen={isOpen}>
        <NovelDialog.Header headerHeading="Book Now" onCloseHandler={onClose} />
        <NovelDialog.Content>
          <div className="book-container">
            <form onSubmit={onBookNowSubmit}>
              <NovelDropdown
                items={locationList}
                value={location?.value ? location?.value : ""}
                placeholder="Please select one"
                label="Location"
                keyId="location_id"
                keyValue="location_short_address"
                keyLabel="location_short_address"
                onChange={onChangeLocation}
                isLoading={loctionLoading}
              />
              <div className="book-form-group mt-1">
                <NovelSuitesInput
                  type="date"
                  inputLabel="Start Date"
                  inputLabelClasses="fw-bold"
                  errorText="Start date is required"
                  onChange={onChangeStartDateHandler}
                  min="2021-11-24"
                  max="2021-12-24"
                  value={start_date?.value ? start_date?.value : ""}
                />
                <NovelSuitesInput
                  type="date"
                  inputLabel="End Date"
                  inputLabelClasses="fw-bold"
                  errorText="End date is required"
                  min={new Date()}
                  onChange={onChangeEndDateHandler}
                  value={end_date?.value ? end_date.value : ""}
                />
              </div>
              <NovelSuitesButton
                type="submit"
                onClick={onBookNowSubmit}
                buttonLabel="Check Availablity"
                disabled={checkBookFormValid()}
                className="novel-button--primary novel-button--block mt-1"
              />
            </form>
          </div>
        </NovelDialog.Content>
      </NovelDialog>
    </Fragment>
  );
};

export default BookNow;
