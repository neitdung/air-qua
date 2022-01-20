import io from 'socket.io-client';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { Admin, Resource } from 'react-admin';
import Chart from "react-apexcharts";

const socket = io('http://localhost:6001', {
  transports: ['websocket', 'polling'],
});

function PPM() {
  let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0], y = [12.051, 12.051, 12.151, 12.051, 12.251, 12.091, 12.051, 12.041, 12.051, 12.081], hour = 0, ppmValue = 0;
  // let x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], hour = 0, ppmValue = 0;

  let [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: x
      },
      yaxis: {
        min: 11,
        max: 13
      }
    },

    series: [
      {
        name: "ppm",
        data: y
      }
    ]
  });

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on('ppm', ppm => {
      if (x[9] == 0) {
        x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        y = [ppm.value, ppm.value, ppm.value, ppm.value, ppm.value, ppm.value, ppm.value, ppm.value, ppm.value, ppm.value];
      } else {
        x.push(++hour);
        y.push(ppm.value);
        x.shift();
        y.shift();
      }

      ppmValue = ppm;

      setData(currentData => {
        currentData = {
          options: {
            chart: {
              id: "basic-bar",
              type: 'line',
              markers: {
                size: [5]
              }
            },
            xaxis: {
              categories: x
            },
            yaxis: {
              min: 11,
              max: 13
            }
          },

          series: [
            {
              name: "ppm",
              data: y
            }
          ]
        }

        return currentData;
      });
    });
  }, []);

  // 2. render the line chart using the state
  return (
    <div className="app">
      <div className="row">
        <div>
          <h3>Current ppm: {data.series[0].data[data.series[0].data.length - 1]}</h3>
        </div>
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            width="900"
          />
        </div>
      </div>
    </div>
  );
};

export default PPM;
