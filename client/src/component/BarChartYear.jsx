// Import Library
import jwtDecode from 'jwt-decode';

// import API
import { getAllIncomesInYearByUserId } from '../service/IncomeService'
import { getAllExpensesInYearByUserId } from '../service/ExpenseService'


import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { CategoryScale, BarElement, LinearScale, Chart, Legend, Tooltip } from "chart.js";
import { useNavigate } from "react-router-dom";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(Legend);
Chart.register(Tooltip);

const BarChartYear = () => {
    // Navigator
    const navigate = useNavigate();

    // create const for data
    const [sumMonthIncome, setSumMonthIncome] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [sumMonthExpense, setSumMonthExpense] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const [months] = useState([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]);

    const [data, setData] = useState({
        labels: months,
        datasets: [
            {
                label: 'Income',
                backgroundColor: 'rgba(194, 116, 161, 0.5)',
                borderColor: 'rgb(194, 116, 161)',
                data: sumMonthIncome,

            },
            {
                label: 'Expenes',
                backgroundColor: 'rgba(71, 225, 167, 0.5)',
                borderColor: 'rgb(71, 225, 167)',
                data: sumMonthExpense,
            },
        ],
    });

    async function getData() {
        // Get token
        const token = localStorage.getItem('token');

        if (token) {
            const user_id = jwtDecode(token).user_id;
            try {
                const responseIncome = await getAllIncomesInYearByUserId(user_id);
                const newSumMonthIncome = responseIncome.data[0].sumMonth;
                // Update sumMonthIncome
                setSumMonthIncome(newSumMonthIncome);

                const responseExpense = await getAllExpensesInYearByUserId(user_id);
                const newSumMonthExpense = responseExpense.data[0].sumMonth;
                // Update sumMonthExpense
                setSumMonthExpense(newSumMonthExpense);

                // Update Data
                setData(prevData => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: newSumMonthIncome,
                        },
                        {
                            ...prevData.datasets[1],
                            data: newSumMonthExpense,
                        },
                    ],
                }));

            } catch (error) {
                console.error(error.message);
            }
        }
        else {
            // Don't have token
            console.log("Don't have token");
            navigate("/");
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (

        <CDBContainer>

            <div className="Chartlable" >Financial of Year</div>

            <Bar data={data} options={{ responsive: true }} />
        </CDBContainer>
    );
};

export default BarChartYear;