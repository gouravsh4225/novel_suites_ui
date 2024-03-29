import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./Pages/PublicPages/AboutUs/AboutUs";
import HomePage from "./Pages/Home/Index";
import Location from "./Pages/Location/Location";
import NovelRooms from "./Pages/NovelRooms/NovelRooms";
import { HeaderFooterLayout } from "./Layout/Layout";
import ContactUs from "./Pages/ContactUs/ContactUs";
import NoPageFound from "./Components/NoPageFound/NoPageFound";
import SignUpPage from "./Pages/PublicPages/SignUp/SignUp";
import NovelRoomDetails from "./Pages/NovelRooms/NovelRoomDetails/NovelRoomDetails";
import NovelRoomCheckOut from "./Pages/NovelRooms/NovelRoomCheckout/NovelRoomCheckout";
import UserProfileCart from "./Components/UserProfile/UserProfileCart/UserProfileCart";
import UserAccount from "./Components/UserProfile/UserAccount/UserAccount";
import UserBooking from "./Components/UserProfile/UserBooking/UserBooking";
import LoginPage from "./Pages/PublicPages/LoginPage/LoginPage";
import ForgotPasswordPage from "./Pages/PublicPages/ForgotPassword/ForgotPasswordPage";
import BookingSuccess from "./Pages/Booking/BookingSuccess/BookingSuccess";
import ResetPassword from "./Pages/PublicPages/ResetPassword/ResetPassword";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <HeaderFooterLayout component={HomePage} />
        </Route>
        <Route
          exact={true}
          path="/forgot-password"
          component={ForgotPasswordPage}
        />
        <Route exact={true} path="/reset-password/:number">
          <HeaderFooterLayout component={ResetPassword} />
        </Route>
        <Route exact={true} path="/login" component={LoginPage} />
        <Route path="/register" component={SignUpPage} exact={true} />

        <Route exact={true} path="/about-us">
          <HeaderFooterLayout component={AboutUs} />
        </Route>
        <Route exact={true} path="/location">
          <HeaderFooterLayout component={Location} />
        </Route>
        <Route exact={true} path="/location/:locationId/rooms">
          <HeaderFooterLayout component={NovelRooms} />
        </Route>
        <Route exact={true} path="/location/:locationId/rooms/:roomId">
          <HeaderFooterLayout component={NovelRoomDetails} />
        </Route>
        <Route exact={true} path="/booking-success/:id">
          <HeaderFooterLayout component={BookingSuccess} />
        </Route>
        <Route exact={true} path="/room-checkout/:id">
          <HeaderFooterLayout component={NovelRoomCheckOut} />
        </Route>
        <Route exact={true} path="/user-cart">
          <HeaderFooterLayout component={UserProfileCart} />
        </Route>
        <Route exact={true} path="/user-account">
          <HeaderFooterLayout component={UserAccount} />
        </Route>
        <Route exact={true} path="/user-bookings">
          <HeaderFooterLayout component={UserBooking} />
        </Route>
        <Route exact={true} path="/contact-us">
          <HeaderFooterLayout component={ContactUs} />
        </Route>
        <Route path="*" exact={true}>
          <HeaderFooterLayout component={NoPageFound} />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
