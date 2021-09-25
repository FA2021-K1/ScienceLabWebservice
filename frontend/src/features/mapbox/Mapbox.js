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
    const size = 200;

    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        // Call once before every frame where the icon will be used.
        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            // Draw the outer circle.
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
            context.fill();

            // Draw the inner circle.
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // Update this image's data with data from the canvas.
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // Continuously repaint the map, resulting
            // in the smooth animation of the dot.
            map.triggerRepaint();

            // Return `true` to let the map know that the image was updated.
            return true;
        }
    };

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
            if (map.current.getLayer("circles")) {
                map.current.removeLayer("circles")
            }
            map.current.addLayer({
                id: "circles",
                type: "symbol",
                source: "circlesPosition",
                layout: {
                    "icon-image": "pulsing-dot",
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
