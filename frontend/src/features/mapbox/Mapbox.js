import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./mapbox.css";
import { SliderContainer } from "./slider";
import Button from "@mui/material/Button";
import { updateSelectedTime } from "../../dataSlice";
import { format } from "date-fns";

require("dotenv").config();

mapboxgl.accessToken = process.env.REACT_APP_SCIENCE_LAB_MAP_ACCESS_TOKEN;

export const Mapbox = () => {
    const style = useSelector((state) => state.style)
    const data = useSelector(state => state.data.data)

    const dispatch = useDispatch();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const selectedTimeStatic = useSelector((state) => state.data.selectedTime);
    const [selectedTime, setSelectedTime] = useState(selectedTimeStatic);

    const [lng, setLng] = useState(11.444);
    const [lat, setLat] = useState(46.7419041);
    const [zoom, setZoom] = useState(15.7);

    const dateFormatter = (time) => {
        return format(time, "MMM dd h a");
    };

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

    let markers = []
    let circleJson = {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: []
        }
    }
    if (data) {
        for (let key in data) {
            const longitude = data[key][0].location.longitude
            const latitude = data[key][0].location.latitude
            
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `   <h3>Buoy: ${key} aka BERND</h3>
                <div class="info"> 
                    <h4>ph-Value:</h4>
                    <p>${data[key][0]["value"]} NTU</p>
                </div>
                <div class="info"> 
                    <h4>Total Dissolved Solids:</h4>
                    <p>ppm</p>
                </div>`
            )
            markers.push(new mapboxgl.Marker({ "color": style.accentColor1 })
                .setLngLat([longitude, latitude])
                .setPopup(popup))
            circleJson.data.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
            })
        }
        console.log(circleJson)
    }
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on("load", () => {
            markers.forEach(element => element.addTo(map.current))
            if (!map.current.getSource("circlesPosition")) {
                map.current.addSource("circlesPosition", circleJson);
            }
            if(map.current.getLayer("circles")){
                map.current.removeLayer("circles")
            }
           map.current.addLayer({
                id: "circles",
                type: "circle",
                source: "circlesPosition",
                paint: {
                    "circle-color": style.grey,
                    "circle-radius": 30,
                    "circle-opacity": 0.5,
                },
            });
            console.log(map.current.getLayer("circles"))
        });
    });

    return (
        <div>
            <div className="sidebar top">
                {dateFormatter(selectedTime)}
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
                    dateFormatter={dateFormatter}
                />
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};
