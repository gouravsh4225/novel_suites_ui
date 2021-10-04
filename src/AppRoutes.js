import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import HomePage from "./Components/Pages/Home/Index";
import Location from "./Components/Pages/Location/Location";
import NovelRooms from "./Components/Pages/NovelRooms/NovelRooms";
import HeaderFooterLayout from "./PageLayout/HeaderFooterLayout/HeaderFooterLayout";

const createRoutesPages = () => {
  return [{ exact: true, navigateUrl: "/", component: HomePage }];
};

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
        <Route exact={true} path="/browse-room">
          <HeaderFooterLayout component={NovelRooms} />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
