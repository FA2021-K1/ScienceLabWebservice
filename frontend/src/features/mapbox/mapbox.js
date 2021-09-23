import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./mapbox.css";
import { SliderContainer } from "./slider";
import Button from "@mui/material/Button";
import { updateSelectedTime } from "../../dataSlice";

require("dotenv").config();

mapboxgl.accessToken = process.env.REACT_APP_SCIENCE_LAB_MAP_ACCESS_TOKEN;

export const MapboxContainer = () => {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const selectedTimeStatic = useSelector((state) => state.data.selectedTime);
  const [selectedTime, setSelectedTime] = useState(selectedTimeStatic);

  const [lng, setLng] = useState(11.444);
  const [lat, setLat] = useState(46.7419041);
  const [zoom, setZoom] = useState(15.7);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl({}));
  });
  if (map.current) {
  }

  const popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
    "Construction on the Washington Monument began in 1848."
  );
  const popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
    "Construction on the Washington Monument began in 1848."
  );
  const popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
    "Construction on the Washington Monument began in 1848."
  );

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      const marker1 = new mapboxgl.Marker()
        .setLngLat([11.4451, 46.743])
        .setPopup(popup1)
        .addTo(map.current);
      const marker2 = new mapboxgl.Marker()
        .setLngLat([11.4471, 46.7426])
        .setPopup(popup2)
        .addTo(map.current);
      const marker3 = new mapboxgl.Marker()
        .setLngLat([11.442, 46.7407])
        .setPopup(popup3)
        .addTo(map.current);

      if (!map.current.getSource("circlesPosition")) {
        map.current.addSource("circlesPosition", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [11.4451, 46.743],
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [11.4471, 46.7426],
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [11.442, 46.7407],
                },
              },
            ],
          },
        });
      }

      map.current.addLayer({
        id: "circles",
        type: "circle",
        source: "circlesPosition",
        paint: {
          "circle-color": "#4264fb",
          "circle-radius": 20,
          "circle-opacity": 0.5,
        },
      });
    });
  });

  return (
    <div>
      <div className="sidebar top">
        {selectedTime.toLocaleString()}
        {selectedTime.toLocaleString() === new Date().toLocaleString() ? null : (
          <Button
            onClick={() => {
              const date = new Date();
              setSelectedTime(date);
              dispatch(updateSelectedTime(date));
            }}
            size="small"
          >
            Reset
          </Button>
        )}
      </div>
      <div className="sidebar bottom">
        <SliderContainer
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
