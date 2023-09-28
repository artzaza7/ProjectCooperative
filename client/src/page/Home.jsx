
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import BarChartYear from "../component/BarChartYear";
import BarChartWeek from "../component/BarChartWeek";
import PieChart from "../component/PieChart";
import Dropdown from 'react-bootstrap/Dropdown';
import DatatablePage from "../component/Table";
import './card.css'
import React from 'react';





function Home() {
    return (
        <><Nav />

            <div class="container-xl my-5">

                <div className="row">
                    <div class="HeaderChart" >Year</div>
                    <BarChartYear />

                    <div class="col-sm-4  col-md-4 col-lg-4  px1">
                        <div class="card card-bg-blue" style={{}}>
                            <div class="card-body">
                                <h5 class="card-title">Total Income</h5>
                                <p class="card-text" className="MoneyText">500$</p>
                                <a href="#" class="card-link">.</a>

                            </div>
                        </div>

                    </div>
                    <div class="col-sm-4  col-md-4 col-lg-4  px1">
                        <div class="card card-bg-red" style={{}}>
                            <div class="card-body">
                                <h5 class="card-title">Total Expense</h5>
                                <p class="card-text" className="MoneyText">500$</p>
                                <a href="#" class="card-link">.</a>


                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4  col-md-4 col-lg-4  px1">
                        <div class="card card-bg-green" style={{}}>
                            <div class="card-body">
                                <h5 class="card-title">Total Summary</h5>
                                <p class="card-text" className="MoneyText">500$</p>
                                <a href="#" class="card-link">.</a>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="col-sm-10  col-md-10 col-lg-10  px1">
                            <div class="HeaderChart">Month</div>
                        </div>
                        <div class="col-sm-2  col-md-2 col-lg-2  px1">
                            <div class="HeaderChart"> <Dropdown>
                                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                                    Select Month
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></div>
                        </div>

                    </div>

                    <div class="col-sm-12  col-md-6 col-lg-6 ">
                        <PieChart />
                        <div className="row">
                            <div class="col-sm-4  col-md-4 col-lg-4  px1">
                                <div class="card card-bg-blue" style={{}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Total Income</h5>
                                        <p class="card-text" className="MoneyText">500$</p>
                                        <a href="#" class="card-link">.</a>

                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-4  col-md-4 col-lg-4  px1">
                                <div class="card card-bg-red" style={{}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Total Expense</h5>
                                        <p class="card-text" className="MoneyText">500$</p>
                                        <a href="#" class="card-link">.</a>


                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4  col-md-4 col-lg-4  px1">
                                <div class="card card-bg-green" style={{}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Total Summary</h5>
                                        <p class="card-text" className="MoneyText">500$</p>
                                        <a href="#" class="card-link">.</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12  col-md-6 col-lg-6  px1">
                        <PieChart />
                        <div className="row">
                            <div class="col-sm-4  col-md-4 col-lg-4  px1">
                                <div class="card card-bg-blue" style={{}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Total Income</h5>
                                        <p class="card-text" className="MoneyText">500$</p>
                                        <a href="#" class="card-link">.</a>

                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-4  col-md-4 col-lg-4  px1">
                                <div class="card card-bg-red" style={{}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Total Expense</h5>
                                        <p class="card-text" className="MoneyText">500$</p>
                                        <a href="#" class="card-link">.</a>


                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4  col-md-4 col-lg-4  px1">
                                <div class="card card-bg-green" style={{}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Total Summary</h5>
                                        <p class="card-text" className="MoneyText">500$</p>
                                        <a href="#" class="card-link">.</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="HeaderChart" style={{ marginTop: '40px' }}>Week</div>
                    <BarChartWeek />
                    <div class="HeaderChart" style={{ marginTop: '40px' }}>Table</div>
                    <DatatablePage />


                </div>


            </div>
            <div class=" mt-auto">
                <Footer />
            </div>


        </>
    )
}
export default Home