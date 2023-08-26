import React, { Fragment, useEffect, useState } from "react";
import NovelSkeleton from "../../SharedComponents/NovelSkeleton/NovelSkeleton";
import LocationCard from "./LocationCard";
import { getAllLocation } from "../../Services/Location/LocationService";
import "./Location.scss";

const LocationSkeletonCards = () => {
  return [1, 2, 3, 4].map((item) => (
    <NovelSkeleton.Card key={item}>
      <NovelSkeleton.CardHeader>
        <NovelSkeleton.FullWidthImage />
      </NovelSkeleton.CardHeader>
      <NovelSkeleton.HalfHeading />
      <NovelSkeleton.FullHeading />
      <div style={{ display: "flex", gap: "1rem" }}>
        <NovelSkeleton.Button />
        <NovelSkeleton.Button />
      </div>
    </NovelSkeleton.Card>
  ));
};

const Location = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    getAllLocation()
      .then((res) => {
        let { response } = res;
        const locationDataResponse = Array.isArray(response.data)
          ? response.data
          : [];
        setLocationList(locationDataResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <div className="location-wrapper container">
        <div className="location-wrapper-title text-center">
          <h1 className="location-wrapper-heading">Locations</h1>
          <p className="location-para-text">
            Locations where you can enjoy our services.
          </p>
        </div>
        <article className="location-card grid-container grid-container-fill grid-gap-1">
          {isLoading ? (
            LocationSkeletonCards()
          ) : (
            <LocationCard locationList={locationList} />
          )}
        </article>
      </div>
    </Fragment>
  );
};

export default Location;
