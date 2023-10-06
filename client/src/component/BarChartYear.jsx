import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { CategoryScale, BarElement, LinearScale, Chart } from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

const BarChartYear = () => {
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
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'Income',
                backgroundColor: 'rgba(194, 116, 161, 0.5)',
                borderColor: 'rgb(194, 116, 161)',
                data: [65, 59, 90, 81, 56, 55, 40],

            },
            {
                label: 'Expends',
                backgroundColor: 'rgba(71, 225, 167, 0.5)',
                borderColor: 'rgb(71, 225, 167)',
                data: [28, 48, 40, 19, 96, 27, 100],
            },
        ],
    });

    return (
        <CDBContainer>

            <div className="Chartlable" >Financial of Year</div>

            <Bar data={data} options={{ responsive: true }} />
        </CDBContainer>
    );
};

export default BarChartYear;