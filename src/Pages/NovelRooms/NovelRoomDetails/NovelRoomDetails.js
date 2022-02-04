import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getRoomByLocationIdAndRoomId,
  addUserToCartRoom,
} from "../../../Services/NovelRoomService/NovelRoomService";
import { getLocationById } from "../../../Services/Location/LocationService";
// import { dateFormatYearMonthDate } from "../../../Utils/FormValidationUtlis";
import {
  Button,
  Loader,
  Toastr,
  Carousel,
  Modal,
} from "../../../UI_Library/UI_Library";
// import CommonUtlis from "../../../Utils/CommonUtlis";
import "./NovelRoomDetails.scss";
import NovelRoomReverseForm from "./NovelRoomReverseForm";

const NovelRoomDetails = () => {
  const { locationId, roomId } = useParams();
  const novelRoomDetailsRouter = useHistory();
  const [room, setroom] = useState({});
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [isItemAddedInCart, setIsItemAddedInCart] = useState(false);
  const [isOpenGallery, setIsOpenGallery] = useState({
    open: false,
    data: [],
  });

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

  // const onAddToCartFormSubmit = (event) => {
  //   event.preventDefault();
  //   if (!isItemAddedInCart) {
  //     addItemInCart();
  //   } else {
  //     novelRoomDetailsRouter.push("/user-cart");
  //   }
  // };

  // const addItemInCart = () => {
  //   const isUserLoggedIn = JSON.parse(CommonUtlis.getSessionUserDetails());
  //   if (!isUserLoggedIn) {
  //     // Toastr.warning("Please login first, before adding into your cart.");
  //     novelRoomDetailsRouter.push({
  //       pathname: `/login`,
  //       search: `?redirect=${window.location.pathname}`,
  //     });
  //     return;
  //   }
  //   Loader.show();
  //   const { check_in, check_out, total_guests, total_night } = reserveRoomForm;
  //   let addCartSendJson = {
  //     locationId: selectedLocation[0]._id,
  //     roomId: room._id,
  //     userId: isUserLoggedIn._id,
  //     start_date: check_in.value,
  //     end_date: check_out.value,
  //     total_night: total_night.value,
  //     total_guests: total_guests.value,
  //   };
  //   addUserToCartRoom(addCartSendJson)
  //     .then((addedCartResponse) => {
  //       Loader.hide();
  //       const { response } = addedCartResponse;
  //       const { data, message, errors } = response;
  //       if (data && !errors.length) {
  //         Toastr.success(message);
  //         setIsItemAddedInCart(true);
  //       }
  //     })
  //     .catch((addCartError) => {
  //       Loader.hide();
  //       console.log(addCartError);
  //     });
  // };

  // const isReverseFormValid = () => {
  //   const { check_in, check_out } = reserveRoomForm;
  //   if (check_out.value && check_in.value) return false;
  //   return true;
  // };

  const onBookRoom = () => {};

  const onViewGalleryHandler = () => {
    const { room_pics } = room;
    setIsOpenGallery({
      open: true,
      data: room_pics ? room_pics : [],
    });
  };
  const onCloseGalleryHandler = () => {
    setIsOpenGallery({
      open: false,
      data: [],
    });
  };
  const { open, data } = isOpenGallery;
  return (
    <Fragment>
      <Modal isOpen={open} isCenter={false}>
        <Modal.Header
          headerHeading="Room Gallery"
          onCloseHandler={onCloseGalleryHandler}
        ></Modal.Header>
        <Modal.Content className="w-full">
          <Carousel items={data} />
        </Modal.Content>
      </Modal>
      <div className="novel-room-details-wrapper">
        <section className="novel-room-media pos-relative container">
          <div className="novel-room-image pblock-1">
            <Carousel items={room.room_pics ? room.room_pics : []} />
            {/* <img src="https://res.cloudinary.com/arbor1221/image/upload/v1498121225/Consulting_Advisory_Professional_services_2_ikqokw.jpg" /> */}
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
                {room?.room_description
                  ? room?.room_description
                  : "Description is not available right now."}
                {/* Aliquip fugiat ut duis duis est veniam do incididunt aute. Amet
                cillum fugiat ad esse dolor officia voluptate adipisicing do
                adipisicing do elit id. Nisi ea velit ipsum cupidatat dolore sit
                mollit mollit. Deserunt excepteur aliqua ullamco velit. Lorem
                deserunt cupidatat nisi eiusmod nisi enim irure et aute
                voluptate eiusmod irure. Exercitation sunt ad sint aliquip eu
                laborum. Officia eu in ut commodo enim culpa. Cillum aliquip eu
                do sint labore incididunt commodo ipsum sit deserunt do
                consectetur commodo. Incididunt exercitation dolore pariatur ut
                dolore. Irure aliqua deserunt et tempor velit amet eu excepteur
                id magna in qui. Laborum pariatur mollit Lorem et elit id labore
                aliquip proident dolor aute. Eiusmod proident consequat
                voluptate consectetur ad dolor aute pariatur irure magna
                consectetur adipisicing. Dolore sint Lorem id culpa cupidatat
                anim elit qui Lorem ullamco */}
              </p>
            </div>
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
                    <div className="novel-amentites-item--service">
                      King Beds
                    </div>
                  </div>
                  <div className="novel-amentites-item">
                    <div className="fa fa-bath" aria-hidden="true"></div>
                    <div className="novel-amentites-item--service">1</div>
                    <div className="novel-amentites-item--service">
                      Bathrooms
                    </div>
                  </div>
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
                        <i
                          className="fa fa-thermometer-empty"
                          aria-hidden="true"
                        ></i>
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
                <div className="novel-room-gallery">
                  <Button
                    className="novel-button--secondary-text novel-button--large"
                    onClick={onViewGalleryHandler}
                  >
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
                  <NovelRoomReverseForm
                    selectedLocation={selectedLocation}
                    room={room}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};
export default NovelRoomDetails;
