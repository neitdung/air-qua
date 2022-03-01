import React, { Component } from "react";
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MUITable from './table';
import './analys.css';

function Analys() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
    //     return (
    //         <MUITable url = {"http://localhost:5000/min"}/>
    //     );
    // }

    return (
        <div className="analys-ppm">
            <div className="minPpm ppm">
                <MUITable url = {"http://localhost:5000/min"} timeFormat = "min"/>
            </div>
            <div className="hourPpm ppm">
                <MUITable url = {"http://localhost:5000/hour"} timeFormat = "hour"/>
            </div>
            <div className="dayPpm ppm">
                <MUITable url = {"http://localhost:5000/day"} timeFormat = "day"/>
            </div>
        </div>
    );
}

export default Analys;
