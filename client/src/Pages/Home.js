import React, { useState, useEffect } from "react";
import NavCustom from "../component/Nav";
import { Card, Col, Container, Row, Dropdown } from "react-bootstrap";
import "./Home.css";
import "./card.css";
import BarChartYear from "../component/BarChartYear";
import BarChartWeek from "../component/BarChartWeek";
import PieChart from "../component/PieChart";
import Table from "../component/Table";
import {
  MoneyCardBlue,
  MoneyCardRed,
  MoneyCardGreen,
} from "../component/MoneyCard";
import Footer from "../component/Footer";

import { useNavigate } from "react-router-dom";

// Adding API
import { getAllIncomesInYearByUserId, getAllIncomesInYearWithTypesByUserId } from '../service/IncomeService'
import { getAllExpensesInYearByUserId, getAllExpenseInYearWithTypesByUserId } from "../service/ExpenseService"
import { getMoneyByUserId } from "../service/MoneyService"

// Import Library
import jwtDecode from 'jwt-decode';
import moment from 'moment';

// Money Class
class Money {
  constructor(type, id, money, money_type, createDate, createDay) {
    this.type = type;
    this.id = id;
    this.money = money;
    this.money_type = money_type;
    this.createDate = createDate;
    this.createDay = createDay;
  }
}

function Home() {
  // สร้างอาร์เรย์ของเงิน (Money objects)
  const [monies, setMonies] = useState([])
  const [loadingMoney, setLoadingMoney] = useState(true)

  const currentMonth = moment().format('MMMM'); // จัดรูปแบบแสดงเดือนในรูปแบบข้อความ

  // Navigator
  const navigate = useNavigate();

  // Data for card of all months in year
  const [incomeYear, setIncomeYear] = useState(0)
  const [expenseYear, setExpenseYear] = useState(0)
  const [total, setTotal] = useState(0)

  // Month with filter
  const [incomeMonth, setIncomeMonth] = useState(0)
  const [expenseMonth, setExpenseMonth] = useState(0)
  const [totalMonth, setTotalMonth] = useState(0)

  const [arrayIncome, setArrayIncome] = useState([0, 0, 0])
  const [arrayExpense, setArrayExpense] = useState([0, 0, 0, 0, 0, 0])
  const [loadingArray, setLoadingArray] = useState(true)

  const months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];
  const [month, setMonth] = useState(currentMonth)

  const monthsDropdown = months.map((item_month, index) => {
    return <Dropdown.Item key={index} onClick={(e) => changeMonth(e, item_month.value, item_month.name)}>{item_month.name}</Dropdown.Item>;
  })

  async function changeMonth(e, month_value, month_name) {
    e.preventDefault();
    setMonth(month_name);

    // Get token
    const token = localStorage.getItem('token');

    if (token) {
      const user_id = jwtDecode(token).user_id;
      try {
        setLoadingArray(true);

        const responseIncomeMonth = await getAllIncomesInYearWithTypesByUserId(month_value, user_id)
        const responseExpenseMonth = await getAllExpenseInYearWithTypesByUserId(month_value, user_id)

        const newIncomeMonthSummary = responseIncomeMonth.data.summary
        // Update incomeMonth
        setIncomeMonth(newIncomeMonthSummary)

        const newExpenseMonthSummary = responseExpenseMonth.data.summary
        // Update expenseMonth
        setExpenseMonth(newExpenseMonthSummary)

        setTotalMonth(newIncomeMonthSummary - newExpenseMonthSummary)

        setArrayIncome(responseIncomeMonth.data.sumType)
        setArrayExpense(responseExpenseMonth.data.sumType)

        setLoadingArray(false);


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
  async function getMoney() {
    // Get token
    const token = localStorage.getItem('token');

    if (token) {
      const user_id = jwtDecode(token).user_id;
      try {
        const response = await getMoneyByUserId(user_id);
        const listIncome = response.data[0].income
        const listExpense = response.data[1].expense

        const moneyAll = [];

        // Loop listIncome
        for (let i = 0; i < listIncome.length; i++) {
          const money = new Money("INCOME", listIncome[i]._id, listIncome[i].money, listIncome[i].money_type, listIncome[i].createDate, listIncome[i].createDay)
          // console.log(money);
          moneyAll.push(money);
        }

        // Loop listExpense
        for (let i = 0; i < listExpense.length; i++) {
          const money = new Money("EXPENSE", listExpense[i]._id, listExpense[i].money, listExpense[i].money_type, listExpense[i].createDate, listExpense[i].createDay)
          // console.log(money);
          moneyAll.push(money);
        }
        setMonies(moneyAll)
        // Finish loading Money
        setLoadingMoney(false)
      }
      catch (error) {
        console.error(error.message);
      }
    }
    else {
      // Don't have token
      console.log("Don't have token");
      navigate("/");
    }
  }

  async function getMonthData() {
    // Get token
    const token = localStorage.getItem('token');

    // Get 
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // เพิ่ม 1 เนื่องจาก getMonth() คืนค่าเดือนเริ่มต้นที่ 0
    if (token) {
      const user_id = jwtDecode(token).user_id;
      try {

        const responseIncomeMonth = await getAllIncomesInYearWithTypesByUserId(currentMonth, user_id)
        // Update arrayIncome
        const newArrayIncome = Object.values(responseIncomeMonth.data.sumType)
        setArrayIncome(newArrayIncome)

        const responseExpenseMonth = await getAllExpenseInYearWithTypesByUserId(currentMonth, user_id)
        // Update arrayExpense
        const newArrayExpense = Object.values(responseExpenseMonth.data.sumType)
        setArrayExpense(newArrayExpense)

        // Finish Loading
        setLoadingArray(false)

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

  async function getData() {

    // Get token
    const token = localStorage.getItem('token');

    // Get 
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // เพิ่ม 1 เนื่องจาก getMonth() คืนค่าเดือนเริ่มต้นที่ 0

    if (token) {
      const user_id = jwtDecode(token).user_id;
      try {
        const responseIncome = await getAllIncomesInYearByUserId(user_id);
        const newIncome = responseIncome.data[0].summary;
        // Update incomeYear
        setIncomeYear(newIncome);

        const responseExpense = await getAllExpensesInYearByUserId(user_id);
        const newExpense = responseExpense.data[0].summary;
        // Update expenseYear
        setExpenseYear(newExpense);

        setTotal(newIncome - newExpense)

        const responseIncomeMonth = await getAllIncomesInYearWithTypesByUserId(currentMonth, user_id)
        const newIncomeMonthSummary = responseIncomeMonth.data.summary
        // Update incomeMonth
        setIncomeMonth(newIncomeMonthSummary)


        const responseExpenseMonth = await getAllExpenseInYearWithTypesByUserId(currentMonth, user_id)
        const newExpenseMonthSummary = responseExpenseMonth.data.summary
        // Update expenseMonth
        setExpenseMonth(newExpenseMonthSummary)

        setTotalMonth(newIncomeMonthSummary - newExpenseMonthSummary)


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
    getMonthData();
    getMoney();
  }, [])

  return (
    <>
      <NavCustom />
      <div>
        <div
          className="ImageBox"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="TextName">Self Finance Management</div>
        </div>
        <div className="TextHeader">Year</div>
        <Card
          style={{
            width: "80%",
            height: "00%",
            marginBottom: "40px",
          }}
          className="mx-auto text-center"
        >
          <Container fluid style={{ backgroundColor: "whitesmoke" }}>
            <BarChartYear />
          </Container>
        </Card>
        <Row style={{ padding: "10px" }}>
          <MoneyCardBlue amountMoney={incomeYear} cardText={"Total Income"} />
          <MoneyCardRed amountMoney={expenseYear} cardText={"Total Expense"} />
          <MoneyCardGreen amountMoney={total} cardText={"Total Summary"} />
        </Row>
        <Row className="BgBox">
          <Col md={10}>
            <div className="TextHeader" style={{ color: "#ffc107" }}>
              Month
            </div>
          </Col>
          <Col md={2}>
            <div className="HeaderChart">
              <Dropdown>
                <Dropdown.Toggle
                  variant="Secondary"
                  id="dropdown-basic"
                  style={{ color: "#ffc107" }}
                >
                  {month}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {monthsDropdown}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row className="BgBox">
          <Col md={1} className=""></Col>
          <Col
            md={5}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div style={{ padding: "20px", width: "70%" }}>
              {!loadingArray ? <PieChart chartName={"Chart1"} mode={"income"} data={arrayIncome} /> : <></>}
            </div>
            {/* <Row style={{ gap: "0.3rem" }}>
              <MoneyCardBlue
                amountMoney={"500 Bath"}
                cardText={"Total Income"}
              />
              <MoneyCardRed
                amountMoney={"500 Bath"}
                cardText={"Total Expense"}
              />
              <MoneyCardGreen
                amountMoney={"500 Bath"}
                cardText={"Total Summary"}
              />
            </Row> */}
          </Col>

          <Col
            md={5}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div style={{ padding: "20px", width: "70%" }}>
              {!loadingArray ? <PieChart chartName={"Chart2"} mode={"expense"} data={arrayExpense} /> : <></>}
            </div>
            {/* <Row style={{ gap: "0.5rem" }}>
              <MoneyCardBlue
                amountMoney={"500 Bath"}
                cardText={"Total Income"}
              />
              <MoneyCardRed
                amountMoney={"500 Bath"}
                cardText={"Total Expense"}
              />
              <MoneyCardGreen
                amountMoney={"500 Bath"}
                cardText={"Total Summary"}
              />
            </Row>{" "} */}
            <Col md={1} className=""></Col>
          </Col>

          <Col>
            <Row style={{ padding: "10px" }}>
              <MoneyCardBlue amountMoney={incomeMonth} cardText={"Total Income"} />
              <MoneyCardRed amountMoney={expenseMonth} cardText={"Total Expense"} />
              <MoneyCardGreen amountMoney={totalMonth} cardText={"Total Summary"} />
            </Row>
          </Col>
        </Row>

        <div className="TextHeader">Week</div>
        <Card
          style={{
            width: "80%",
            height: "00%",
            marginBottom: "40px",
          }}
          className="mx-auto text-center"
        >
          <Container fluid style={{ backgroundColor: "whitesmoke" }}>
            <BarChartWeek />
          </Container>
        </Card>
        {/* <div className="TextHeader">Table</div> */}
        {/* <Card
          style={{
            width: "80%",
            height: "00%",
            marginBottom: "40px",
          }}
          className="mx-auto text-center"
        >
          <Container fluid style={{ backgroundColor: "#FFC107" }}>
            {!loadingMoney ? <Table monies={monies} />
              : <div>LOADING</div>
            }
          </Container>
        </Card> */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
