import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./Pages/AboutUs/AboutUs";
import HomePage from "./Pages/Home/Index";
import Location from "./Pages/Location/Location";
import NovelRooms from "./Pages/NovelRooms/NovelRooms";
import HeaderFooterLayout from "./PageLayout/HeaderFooterLayout/HeaderFooterLayout";
import ContactUs from "./Pages/ContactUs/ContactUs";
import NoPageFound from "./Components/NoPageFound/NoPageFound";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <HeaderFooterLayout component={HomePage} />
        </Route>
        <Route exact={true} path="/about-us">
          <HeaderFooterLayout component={AboutUs} />
        </Route>
        <Route exact={true} path="/location">
          <HeaderFooterLayout component={Location} />
        </Route>
        <Route exact={true} path="/location/:locationId/rooms">
          <HeaderFooterLayout component={NovelRooms} />
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
