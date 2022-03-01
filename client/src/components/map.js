import React, { useEffect, useState } from "react";
import "./style.css";
import io from 'socket.io-client';

import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

    let Node = {
        id: 0,
        lat: 0,
        lng: 0,
        title: 'ppm'
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        // console.log(e)
        setOpen(false);
        setData(currentData => {
            currentData.push(Node);

            return currentData;
        })
    };

    const changeId = (e) => {
        Node.id = 12.755;
    }

    const changeLat= (e) => {
        Node.lat = e.target.value;
    }

    const changeLng = (e) => {
        Node.lng = e.target.value;
    }

    return (
        <div className="App">
            <div>
                <Button style={{margin: "10px 0"}} variant="contained" onClick={handleClickOpen}>
                    Thêm thiết bị
                </Button>
                <Dialog open={open}>
                    <DialogTitle>Thêm thiết bị</DialogTitle>
                    <DialogContent>
                        <TextField onChange={changeId}
                            autoFocus
                            margin="dense"
                            id="id"
                            label="ID"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField onChange={changeLat}
                            autoFocus
                            margin="dense"
                            id="lat"
                            label="Lat"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField onChange={changeLng}
                            autoFocus
                            margin="dense"
                            id="lng"
                            label="Lng"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyA2OqJoCG8K6k8jB1gPUHJ51Wuo4TFgAbU',
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
