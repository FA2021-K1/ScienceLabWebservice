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


var markers = [];

export const Mapbox = () => {
    const style = useSelector((state) => state.style);
    const data = useSelector((state) => state.data.latestData);

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


    let circleJson = {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: []
        }
    }



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
    const size = 150;

    
    function createMarkerContent() {
        clearMarkers();
        for (let key in data) {
            const longitude = data[key][0].location.longitude
            const latitude = data[key][0].location.latitude

            const popup = new mapboxgl.Popup({ offset: 25, className: 'mapbox-gl-popup' }).setHTML(
                `   <h3>Buoy: ${key}</h3>
                <div class="info"> 
                    <h4>ph-Value:</h4>
                    <p>${data[key][0]["value"]}</p>
                </div>
                <div class="info"> 
                    <h4>Total Dissolved Solids:</h4>
                    <p>${data[key][1]["value"]}ppm</p>
                </div>`
            )
            var marker = new mapboxgl.Marker({ "color": style.accentColor1, className: 'mapbox-gl-marker' })
                .setLngLat([longitude, latitude])
                .setPopup(popup)
                .addTo(map.current)
            circleJson.data.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
            })
            markers.push(marker);
            console.log("added markers " + markers.length);
        }
    }
    function clearMarkers(markersToRemove) {
        markers.forEach((marker) => marker.remove());
        markers = [];
    }
    //update popup content
    useEffect(() => {
        createMarkerContent();
    }, [data]);
    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: () => {
            if (this != null) {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d');
            }
        },

        // Call once before every frame where the icon will be used.
        render: () => {
            if (this != null) {
                const duration = 1000;
                const t = (performance.now() % duration) / duration;

                const radius = (size / 2) * 0.3;
                const outerRadius = (size / 2) * 0.5 * t + radius;
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
                context.fillStyle = style.Green;
                context.globalAlpha = 1 - t;
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
                context.fillStyle = style.Green;
                context.globalAlpha = 1;
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
                map.current.triggerRepaint();

                // Return `true` to let the map know that the image was updated.
                return true;
            }
        }
    };


    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });


        map.current.on("load", () => {
            //markers.forEach(element => element.addTo(map.current))

            if (data) {
                if (map.current.hasImage("pulsing-dot")) {
                    map.current.removeImage("pulsing-dot")
                }
                map.current.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

                if (!map.current.getSource("circlesPosition")) {
                    map.current.addSource('circlesPosition', circleJson);
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
                        "icon-allow-overlap": true,
                    },
                })
            }
        });

    });


    return (
        <div>
            
            <div ref={mapContainer} className="map-container" >
            <div className="sidebar top" style = {{fontSize:"15px"}}>
                {dateFormatter(new Date(selectedTime))}
                {(new Date(selectedTime)).toLocaleString() ===
                    new Date().toLocaleString() ? null : (
                    <Button
                        onClick={() => {
                            const date = (new Date()).getTime();
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
            </div>
        </div>
    );
}
