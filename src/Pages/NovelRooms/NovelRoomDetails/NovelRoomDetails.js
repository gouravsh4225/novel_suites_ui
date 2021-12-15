import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getRoomByLocationIdAndRoomId } from "../../../Services/NovelRoomService/NovelRoomService";
import { getLocationById } from "../../../Services/Location/LocationService";
import { dateFormatYearMonthDate } from "../../../Utils/FormValidationUtlis";
import {
  Button,
  Input,
  Loader,
  Toastr,
  Menu,
  Label,
} from "../../../UI_Library/UI_Library";
import "./NovelRoomDetails.scss";

const NovelRoomDetails = () => {
  const { locationId, roomId } = useParams();
  const novelRoomDetailsRouter = useHistory();
  const [room, setroom] = useState({});
  const [menutarget, setMenuTarget] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState([]);
  useEffect(() => {
    Loader.show();
    getRoomByLocationIdAndRoomId(locationId, roomId)
      .then((roomResponse) => {
        Loader.hide();
        let { response } = roomResponse;
        if (Array.isArray(response.data) && response.data.length) {
          setroom(response.data[0]);
        }
      })
      .catch((roomError) => {
        Loader.hide();
        let { message } = roomError;
        Toastr.error(message);
      });
    /** get current Location details */
    getLocationById(locationId)
      .then((locationReponse) => {
        let { response } = locationReponse;
        if (response && Array.isArray(response.data) && response.data.length) {
          setSelectedLocation(response.data);
        }
      })
      .catch((locationError) => {
        console.log(locationError);
      });
  }, []);

  const navigateToRooms = () => {
    const redirectUrl = `/location/${locationId}/rooms`;
    novelRoomDetailsRouter.push(redirectUrl);
  };

  const addGuestsHandler = (e) => {
    const { target } = e;
    setMenuTarget(e.currentTarget);
  };

  const onCloseGuestsHandler = () => {
    setMenuTarget(null);
  };

  return (
    <div className="novel-room-details-wrapper">
      <section className="novel-room-media pos-relative fluid-container">
        <div className="novel-room-image">
          <img src="https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg" />
        </div>
        <div className="novel-room-content">
          <Button
            className="novel-button--secondary-text novel-button--small back-button"
            style={{ padding: "10px 16px" }}
            title="Back To Rooms"
            onClick={navigateToRooms}
          >
            <span className="icon">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </span>
          </Button>
          <div className="novel-room-head mb-1">
            <h2 className="novel-room-title">{room?.room_name}</h2>
          </div>
          <div className="novel-room-head mb-1">
            {/* <p className="novel-room-descri">{room?.room_description}</p> */}
            <p className="novel-room-descri">
              Aliquip fugiat ut duis duis est veniam do incididunt aute. Amet
              cillum fugiat ad esse dolor officia voluptate adipisicing do
              adipisicing do elit id. Nisi ea velit ipsum cupidatat dolore sit
              mollit mollit. Deserunt excepteur aliqua ullamco velit. Lorem
              deserunt cupidatat nisi eiusmod nisi enim irure et aute voluptate
              eiusmod irure. Exercitation sunt ad sint aliquip eu laborum.
              Officia eu in ut commodo enim culpa. Cillum aliquip eu do sint
              labore incididunt commodo ipsum sit deserunt do consectetur
              commodo. Incididunt exercitation dolore pariatur ut dolore. Irure
              aliqua deserunt et tempor velit amet eu excepteur id magna in qui.
              Laborum pariatur mollit Lorem et elit id labore aliquip proident
              dolor aute. Eiusmod proident consequat voluptate consectetur ad
              dolor aute pariatur irure magna consectetur adipisicing. Dolore
              sint Lorem id culpa cupidatat anim elit qui Lorem ullamco
            </p>
          </div>
          <div className="novel-room-feature mb-1">
            <h4 className="novel-room-feature-title">Features</h4>
            <ul className="novel-room-feature-list">
              <li className="novel-room-feature-list-item">
                <span className="feature-list-item-icon">
                  <i className="fa fa-wifi" aria-hidden="true"></i>
                </span>
                <span className="fature-list-item-title">Wifi</span>
              </li>
              <li className="novel-room-feature-list-item">
                <span className="feature-list-item-icon">
                  <i className="fa fa-television" aria-hidden="true"></i>
                </span>
                <span className="fature-list-item-title">TV</span>
              </li>
              <li className="novel-room-feature-list-item">
                <span className="feature-list-item-icon">
                  <i className="fa fa-coffee" aria-hidden="true"></i>
                </span>
                <span className="fature-list-item-title">COFFEE</span>
              </li>
              <li className="novel-room-feature-list-item">
                <span className="feature-list-item-icon">
                  <i className="fa fa-thermometer-empty" aria-hidden="true"></i>
                </span>
                <span className="fature-list-item-title">HEATHEN</span>
              </li>
              <li className="novel-room-feature-list-item">
                <span className="feature-list-item-icon">
                  <i className="fa fa-television" aria-hidden="true"></i>
                </span>
                <span className="fature-list-item-title">AC</span>
              </li>
              <li className="novel-room-feature-list-item">
                <span className="feature-list-item-icon">
                  <i className="fa fa-car" aria-hidden="true"></i>
                </span>
                <span className="fature-list-item-title">
                  Parking
                  <div className="fs-textSm">
                    (Parking charges will be added)
                  </div>
                </span>
              </li>
            </ul>
          </div>
          {/* <div className="novel-room-book">
            <Button
              buttonLabel="Book Now"
              className="novel-button--primary"
              onClick={(e) => console.log("hey")}
              style={{ minWidth: "70%" }}
            />
          </div> */}
        </div>
      </section>

      <section className="container mt-1">
        <div
          className="m-auto novel-card"
          style={{
            boxShadow: "1rem 1rem 3rem rgb(0 0 0 / 18%)",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <div className="novel-room-reverse">
            <div className="novel-room-more-details">
              <h2 className="fw-normal text-center">{room?.room_name}</h2>
              {/* <p className="fw-normal text-center">{room?.room_description}</p> */}
              <p className="fw-normal ">
                Eiusmod labore et eu elit anim. Aliqua quis do amet officia
                laborum commodo. Ut consequat exercitation occaecat aute
                consectetur ea sunt enim anim qui cillum aute.
              </p>
              <div className="novel-room-amenities mt-2">
                <div className="novel-amentites-item">
                  <p className="fa fa-user" aria-hidden="true"></p>
                  <div className="novel-amentites-item--service">
                    {room?.allowed_gustes}
                  </div>
                  <div className="novel-amentites-item--service">Persons</div>
                </div>
                <div className="novel-amentites-item">
                  <p className="fa fa-bed" aria-hidden="true"></p>
                  <div className="novel-amentites-item--service">
                    {room?.total_beds}
                  </div>
                  <div className="novel-amentites-item--service">King Beds</div>
                </div>
                <div className="novel-amentites-item">
                  <div className="fa fa-bath" aria-hidden="true"></div>
                  <div className="novel-amentites-item--service">1</div>
                  <div className="novel-amentites-item--service">Bathrooms</div>
                </div>
              </div>
              <div className="novel-room-gallery">
                <Button className="novel-button--secondary-text novel-button--large">
                  <div className="novel-room-button">
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                    <span className="ml-1">View Gallery </span>
                  </div>
                </Button>
              </div>
            </div>
            <div className="novel-room-booking">
              <div className="reverse-card">
                <div className="reverse-ttile">
                  <h3>Reserve your Room</h3>
                </div>
                <form role="book-reverse" className="reverse-form">
                  <div className="form-selected-location">
                    {selectedLocation.length ? (
                      <Label className="novel-menu-item mb-1 location-text">
                        Location:{selectedLocation[0].short_address}
                      </Label>
                    ) : null}
                  </div>
                  <div className="form-heading">
                    <div className="room-content">From</div>
                    <div className="room-prices-wrapper">
                      <span
                        className="fa fa-inr icon-cur"
                        aria-hidden="true"
                      ></span>
                      <span className="price">
                        {room?.room_price?.toFixed(2)}
                      </span>
                      <span className="fw-bold">/night</span>
                    </div>
                  </div>
                  <div className="form-reverse-dates">
                    <Input
                      type="date"
                      inputLabel="Check In"
                      inputLabelClasses="fw-normal text-uppercase"
                      // errorText={!end_date?.value ? end_date?.errorText : ""}
                      // min={
                      //   start_date?.value
                      //     ? start_date?.value
                      //     : dateFormatYearMonthDate(new Date())
                      // }
                      // onChange={onChangeEndDateHandler}
                      // value={end_date?.value ? end_date.value : ""}
                      // name="end_date"
                    />
                    <Input
                      type="date"
                      inputLabel="Check Out"
                      inputLabelClasses="fw-normal text-uppercase"
                      // errorText={!end_date?.value ? end_date?.errorText : ""}
                      // min={
                      //   start_date?.value
                      //     ? start_date?.value
                      //     : dateFormatYearMonthDate(new Date())
                      // }
                      // onChange={onChangeEndDateHandler}
                      // value={end_date?.value ? end_date.value : ""}
                      // name="end_date"
                    />
                  </div>
                  <div className="reverse-form-night">
                    <Input
                      readOnly="true"
                      type="number"
                      inputLabel="Total Night"
                      inputLabelClasses="fw-normal textXl text-uppercase"
                    />
                    <Button
                      title="Guests"
                      className="bg-white w-full"
                      onClick={addGuestsHandler}
                    >
                      <div className="d-flex">
                        1 Guests
                        <span className="guest-icon ml-auto">
                          <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                    </Button>
                    <Menu
                      isOpen={Boolean(menutarget)}
                      targetElement={menutarget}
                      onClose={onCloseGuestsHandler}
                    >
                      <Menu.MenuItem>1</Menu.MenuItem>
                      <Menu.MenuItem>2</Menu.MenuItem>
                      <Menu.MenuItem>3</Menu.MenuItem>
                    </Menu>
                  </div>
                  <Button
                    className="novel-button--primary novel-button--large novel-button--block mt-1"
                    title="Checkout"
                  >
                    <span>
                      <i className="fa fa-cart-plus" aria-hidden="true"></i>
                    </span>
                    <span className="ml-1">Checkout</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default NovelRoomDetails;
