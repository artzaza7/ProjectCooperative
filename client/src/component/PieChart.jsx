import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { CategoryScale, BarElement, LinearScale, Chart, ArcElement, Legend, Tooltip } from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(ArcElement);
Chart.register(Legend);
Chart.register(Tooltip);

// const for Dropdown
const incomes = ['เงินเดือน', 'งานพิเศษ', 'โบนัส'];
const expenses = ['ค่าอาหาร', 'ค่าเดินทาง', 'ค่าที่พัก', 'หนี้', 'ความสุข', 'ค่าของใช้'];

class PieChart extends React.Component {

    stataForIncome = {
        dataPie: {
            labels: incomes,
            datasets: [
                {
                    data: this.props.data,
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C"
                    ],
                    hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1",
                        "#FFC870"
                    ]
                }
            ]
        }
    }
    stateForExpense = {
        dataPie: {
            labels: expenses,
            datasets: [
                {
                    data: this.props.data,
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C",
                        "#949FB1",
                        "#4D5360",
                        "#AC64AD"
                    ],
                    hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1",
                        "#FFC870",
                        "#A8B3C5",
                        "#616774",
                        "#DA92DB"
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <MDBContainer>
                <h3 className="Chartlable">{this.props.chartName}</h3>
                <Pie data={this.props.mode === "income" ? this.stataForIncome.dataPie : this.stateForExpense.dataPie} options={{ responsive: true }} />
            </MDBContainer>
        );
    }
}

export default PieChart;