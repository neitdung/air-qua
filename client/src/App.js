import io from 'socket.io-client';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import Chart from "react-apexcharts";

const socket = io('http://localhost:6000', {
  transports: ['websocket', 'polling'],
});

function App() {
  let x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], hour = 0, ppmValue = 0;

  let [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: x
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
      x.push(++hour);
      y.push(ppm.value);
      x.shift();
      y.shift();
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
                min: 10,
                max: 20
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
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
