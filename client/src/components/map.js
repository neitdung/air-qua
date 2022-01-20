import React, { useEffect, useState } from "react";
import "./style.css";
import io from 'socket.io-client';

import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";

// implementation of this function is needed for codesandbox example to work
// you can remove it otherwise
const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
        // return distance between the marker and mouse pointer
        return Math.sqrt(
            (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
        );
    }
};

// const points = [
//     { id: '11.914', title: "Round Pond", lat: 21.029, lng: 105.830 },
//     { id: '11.954', title: "The Long Water", lat: 21.024, lng: 105.840 },
//     { id: '11.928', title: "The Serpentine", lat: 21.027, lng: 105.820 }
// ];

const socket = io('http://localhost:6001', {
  transports: ['websocket', 'polling'],
});

export default function App() {
    let [points, setData] = useState([
        { id: '11.915', title: "ppm", lat: 21.029, lng: 105.830 },
        { id: '11.954', title: "ppm", lat: 21.024, lng: 105.840 },
        { id: '11.928', title: "ppm", lat: 21.027, lng: 105.820 },
        { id: '11.911', title: "ppm", lat: 21.033, lng: 105.822 },
        { id: '11.917', title: "ppm", lat: 21.022, lng: 105.820 },
        { id: '11.978', title: "ppm", lat: 21.021, lng: 105.830 },
    ]);

    useEffect(() => {
        socket.on('ppm', ppm => {
            setData(currentData => {
                currentData[0].id = ppm.value;

                return currentData;
            })
        });
      }, []);

    return (
        <div className="App">
            <GoogleMapReact
                bootstrapURLKeys={{
                    language: "en",
                    region: "US"
                }}
                defaultCenter={{ lat: 21.027, lng: 105.834 }}
                defaultZoom={15}
                distanceToMouse={distanceToMouse}
            >
                {points.map(({ lat, lng, id, title }) => {
                    return (
                        <MyMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} />
                    );
                })}
            </GoogleMapReact>
        </div>
    );
}
