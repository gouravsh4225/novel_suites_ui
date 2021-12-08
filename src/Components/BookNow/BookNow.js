import React, { Fragment, useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import NovelDialog from "../../UI_Library/NovelDialog/NovelDialog";
import NovelDropdown from "../../UI_Library/NovelDropdown/NovelDropdown";
import {
  getAllLocation,
  checkAvailablity,
} from "../../Services/Location/LocationService";
import NovelSuitesInput from "../../UI_Library/NovelSuitesInput/NovelSuitesInput";
import NovelSuitesButton from "../../UI_Library/NovelSuitesButton/NovelSuitesButton";
import NovelAlerts from "../../UI_Library/NovelAlerts/NovelAlerts";
import "./BookNow.scss";
import { NovelLoader } from "../../UI_Library/NovelLoader/NovelLoader";
import { dateFormatYearMonthDate } from "../../Utils/FormValidationUtlis";

const BookFormInitalData = () => {
  return {
    location: {
      value: "",
      errorText: "Location is required",
    },
    start_date: {
      value: "",
      errorText: "Start Date is required",
    },
    end_date: {
      value: "",
      errorText: "End Date is required",
    },
  };
};

const BookNow = ({ isOpen, onClose }) => {
  const bookComponentHistory = useHistory();
  const [locationList, setLocationList] = useState([]);
  const [bookFormInput, setBookFormInput] = useState(BookFormInitalData());
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
        let { data } = res.response;
        const locationDataResponse = Array.isArray(data) ? data : [];
        setLocationList(locationDataResponse);
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
    let datesValidateObject = validateDates(start_date.value, end_date.value);
    let { hasTrueValue, message } = datesValidateObject;
    if (hasTrueValue) {
      NovelLoader.show();
      let checkAvailableJson = {
        start_date: start_date.value,
        end_date: end_date.value,
        locationId: location.value._id,
      };
      checkAvailablity(checkAvailableJson)
        .then((response) => {
          NovelLoader.hide();
          onClose();
          if (response) {
            console.log("in response");
            bookComponentHistory.push(`/location/${location.value._id}/rooms`);
          }
        })
        .catch((error) => console.log(error));
      console.log(checkAvailableJson, "==>");
    } else {
      NovelAlerts.error(message, {
        autoDelete: true,
      });
    }
  };

  const validateDates = (start_date, end_date) => {
    let errorDatesObjects = {
      hasTrueValue: false,
      message: "",
    };
    if (start_date && end_date) {
      if (Date.parse(end_date) >= Date.parse(start_date)) {
        errorDatesObjects.hasTrueValue = true;
        return errorDatesObjects;
      } else {
        errorDatesObjects.hasTrueValue = false;
        errorDatesObjects.message = `End Date should be equal or greater than start date`;
        return errorDatesObjects;
      }
    } else {
      errorDatesObjects.hasTrueValue = false;
      errorDatesObjects.message = `Start Date and End date are Required`;
      return errorDatesObjects;
    }
  };

  const onChangeLocation = (event, value) => {
    const { location } = bookFormInput;
    location.value = value;
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

  const checkBookFormValid = useMemo(() => {
    const { location, start_date, end_date } = bookFormInput;
    return ![location, start_date, end_date].every((item) => item.value);
  });

  const { location, start_date, end_date } = bookFormInput;

  return (
    <Fragment>
      <NovelDialog onEscKeyClose={onClose} isOpen={isOpen}>
        <NovelDialog.Header headerHeading="Book Now" onCloseHandler={onClose} />
        <NovelDialog.Content>
          <div className="book-container">
            <form onSubmit={onBookNowSubmit}>
              <div className="">
                <NovelDropdown
                  items={locationList}
                  value={location?.value ? location?.value.short_address : ""}
                  placeholder="Please select one"
                  label="Location"
                  keyId="_id"
                  keyValue="short_address"
                  keyLabel="short_address"
                  onChange={onChangeLocation}
                  isLoading={loctionLoading}
                />
                <p
                  className="novel-input-wrapper--error"
                  style={{ marginTop: "0.5rem" }}
                >
                  {!location.value ? location.errorText : ""}
                </p>
              </div>
              <div className="book-form-input mt-1">
                <NovelSuitesInput
                  type="date"
                  inputLabel="Start Date"
                  inputLabelClasses="fw-bold"
                  errorText={!start_date?.value ? start_date?.errorText : ""}
                  onChange={onChangeStartDateHandler}
                  min={dateFormatYearMonthDate(new Date())}
                  value={start_date?.value ? start_date?.value : ""}
                  // name="start_date"
                />
                <NovelSuitesInput
                  type="date"
                  inputLabel="End Date"
                  inputLabelClasses="fw-bold"
                  errorText={!end_date?.value ? end_date?.errorText : ""}
                  min={
                    start_date?.value
                      ? start_date?.value
                      : dateFormatYearMonthDate(new Date())
                  }
                  onChange={onChangeEndDateHandler}
                  value={end_date?.value ? end_date.value : ""}
                  // name="end_date"
                />
              </div>
              <NovelSuitesButton
                type="submit"
                onClick={onBookNowSubmit}
                buttonLabel="Check Availablity"
                disabled={checkBookFormValid}
                className="novel-button--primary novel-button--block mt-1"
              />
            </form>
          </div>
        </NovelDialog.Content>
      </NovelDialog>
    </Fragment>
  );
};

export default React.memo(BookNow);
