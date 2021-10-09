import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./Pages/AboutUs/AboutUs";
import HomePage from "./Pages/Home/Index";
import Location from "./Pages/Location/Location";
import NovelRooms from "./Pages/NovelRooms/NovelRooms";
import HeaderFooterLayout from "./PageLayout/HeaderFooterLayout/HeaderFooterLayout";
import ContactUs from "./Pages/ContactUs/ContactUs";

const AppRoutes = () => {
  console.log("hey in routes");
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <h2>fsdfs</h2>
          <HeaderFooterLayout component={HomePage} />
        </Route>
        <Route exact={true} path="/about-us">
          <HeaderFooterLayout component={AboutUs} />
        </Route>
        <Route exact={true} path="/location">
          <HeaderFooterLayout component={Location} />
        </Route>
        <Route exact={true} path="/browse-rooms">
          <HeaderFooterLayout component={NovelRooms} />
        </Route>
        <Route exact={true} path="/contact-us">
          <HeaderFooterLayout component={ContactUs} />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
