import React, { Component } from "react";
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Analys() {
    let x = ['12/1', '13/1', '14/1', '15/1', '16/1', '17/1', '18/1', '19/1', '20/1', '21/1'],
        y = [12.051, 12.051, 12.151, 12.051, 12.251, 12.091, 12.051, 12.041, 12.051, 12.081];

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

    const setDataChart = (xData, yData) => {
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
                  categories: xData
                },
                yaxis: {
                  min: yData[0] - 2,
                  max: yData[0] + 2
                }
              },

              series: [
                {
                  name: "ppm",
                  data: yData
                }
              ]
            }
    
            return currentData;
          });
    }

    const hour = () => {
        setDataChart(
            ['22:00', '23:00', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
            [12.051, 12.151, 12.251, 12.351, 12.451, 12.591, 12.651, 12.741, 12.851, 12.981]
        )
    }

    const day = () => {
        setDataChart(
            ['12/1', '13/1', '14/1', '15/1', '16/1', '17/1', '18/1', '19/1', '20/1', '21/1'],
            [12.051, 12.051, 12.151, 12.051, 12.251, 12.091, 12.051, 12.152, 12.251, 12.188]
        )
    }

    const month = () => {
        setDataChart(
            ['04/2021', '05/2021', '06/2021', '07/2021', '08/2021', '09/2021', '10/2021', '11/2021', '12/2021', '01/2022'],
            [12.051, 12.051, 12.151, 12.051, 12.251, 12.091, 12.051, 12.041, 12.051, 12.081]
        )
    }

    // 2. render the line chart using the state
    return (
        <div className="app">
            <Stack spacing={2} direction="row">
                <Button onClick={hour} variant="contained">Giờ</Button>
                <Button onClick={day} variant="contained">Ngày</Button>
                <Button onClick={month} variant="contained">Tháng</Button>
            </Stack>
            <div className="row">
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

export default Analys;
