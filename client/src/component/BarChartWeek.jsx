import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import './css/Nav.css'
import { CategoryScale, BarElement, LinearScale, Chart } from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

function BarChartWeek(props) {
    const { nestedArray } = props

    // console.log("nestedArray : ", nestedArray)

    const [data] = useState({
        options: {
            legend: {
                display: true,

            },

            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            // Stack 0 : Income, 1 : Expense
            {
                label: 'งานพิเศษ',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'rgb(255, 0, 0)',
                data: nestedArray[0],
                stack: 'Stack 0',
            },
            {
                label: 'เงินเดือน',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                borderColor: 'rgb(0, 0, 255)',
                data: nestedArray[1],
                stack: 'Stack 0',
            },
            {
                label: 'โบนัส',
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderColor: 'rgb(255, 255, 0)',
                data: nestedArray[2],
                stack: 'Stack 0',
            },
            {
                label: 'ความสุข',
                backgroundColor: 'rgba(0, 255, 255, 0.5)',
                borderColor: 'rgb(0, 255, 255)',
                data: nestedArray[3],
                stack: 'Stack 1',
            },
            {
                label: 'ค่าของใช้',
                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                borderColor: 'rgb(128, 128, 128)',
                data: nestedArray[4],
                stack: 'Stack 1',
            },
            {
                label: 'ค่าที่พัก',
                backgroundColor: 'rgba(255, 128, 0, 0.5)',
                borderColor: 'rgb(255, 128, 0)',
                data: nestedArray[5],
                stack: 'Stack 1',
            },
            {
                label: 'ค่าอาหาร',
                backgroundColor: 'rgba(0, 128, 255, 0.5)',
                borderColor: 'rgb(0, 128, 255)',
                data: nestedArray[6],
                stack: 'Stack 1',
            },
            {
                label: 'ค่าเดินทาง',
                backgroundColor: 'rgba(128, 0, 255, 0.5)',
                borderColor: 'rgb(128, 0, 255)',
                data: nestedArray[7],
                stack: 'Stack 1',
            },
            {
                label: 'หนี้',
                backgroundColor: 'rgba(192, 192, 192, 0.5)',
                borderColor: 'rgb(192, 192, 192)',
                data: nestedArray[8],
                stack: 'Stack 1',
            }
        ],
    });

    return (
        <CDBContainer>
            <div className="Chartlable" >Financial of Week</div>
            <Bar data={data} options={{ responsive: true }} />
        </CDBContainer>
    );
};

export default BarChartWeek;