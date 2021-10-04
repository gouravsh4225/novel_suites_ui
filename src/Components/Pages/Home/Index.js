import { Fragment } from "react";
import AppHeader from "../../../SharedComponents/AppHeader/AppHeader";
import Home from "./Home";

const HomePage = () => {
  return (
    <Fragment>
      <AppHeader />
      <Home />
    </Fragment>
  );
};

export default HomePage;
