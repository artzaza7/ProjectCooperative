import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import DatatablePage from "../component/Table";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Adding API
import { getMoneyByUserId } from "../service/MoneyService";

// Import Library
import jwtDecode from "jwt-decode";

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

function AllTranscation() {
  // Navigator
  const navigate = useNavigate();

  // Setting loading
  const [loading, setLoading] = useState(false);
  const [allArray, setAllArray] = useState([]);
  const [incomeArray, setIncomeArray] = useState([]);
  const [expenseArray, setExpenseArray] = useState([]);

  async function getDataInIt() {
    // Get token
    const token = localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user_id;
      try {
        const response = await getMoneyByUserId(user_id);
        const listIncome = response.data[0].income;
        const listExpense = response.data[1].expense;

        const moneyAll = [];
        const moneyIncome = [];
        const moneyExpense = [];
        // Loop listIncome
        for (let i = 0; i < listIncome.length; i++) {
          const money = new Money(
            "INCOME",
            listIncome[i]._id,
            listIncome[i].money,
            listIncome[i].money_type,
            listIncome[i].createDate,
            listIncome[i].createDay
          );
          // console.log(money);
          moneyAll.push(money);
          moneyIncome.push(money);
        }
        setIncomeArray(moneyIncome);

        // Loop listExpense
        for (let i = 0; i < listExpense.length; i++) {
          const money = new Money(
            "EXPENSE",
            listExpense[i]._id,
            listExpense[i].money,
            listExpense[i].money_type,
            listExpense[i].createDate,
            listExpense[i].createDay
          );
          // console.log(money);
          moneyAll.push(money);
          moneyExpense.push(money);
        }
        setExpenseArray(moneyExpense);

        setAllArray(moneyAll);
        // Finish loading Money
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      // Don't have token
      console.log("Don't have token");
      navigate("/");
    }
  }

  useEffect(() => {
    getDataInIt();
  }, [loading]);

  return (
    <>
      <Nav />
      <font>
        <div
          className="ImageBox"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <div className="TextName">All Transaction</div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex", // Make the Container a flex container
            justifyContent: "flex-end", // Align its children to the end
          }}
        >
          <Link to={{ pathname: "/incomeform", state: { typeName: "Income" } }}>
            <Button
              variant="success"
              style={{
                marginRight: "1rem",
                width: "10rem",
                height: "3rem",
                fontSize: "1.5rem",
              }}
            >
              + Income
            </Button>{" "}
          </Link>
          <Link
            to={{
              pathname: "/expenseform",
              state: { typeName: "Expense" },
            }}
          >
            <Button
              variant="danger"
              style={{
                marginRight: "1rem",
                width: "10rem",
                height: "3rem",
                fontSize: "1.5rem",
              }}
            >
              + Expense
            </Button>
          </Link>
        </div>
        <Container>
          <ul
            className="nav nav-tabs justify-content-center"
            id="myTab"
            role="tablist"
          >
            <div className="Header">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  style={{ color: "black" }}
                >
                  All
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  style={{ color: "black" }}
                >
                  Income
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  style={{ color: "black" }}
                >
                  Expense
                </button>
              </li>
            </div>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
              style={{ backgroundColor: "whitesmoke" }}
            >
              {!loading ? (
                <DatatablePage monies={allArray} />
              ) : (
                <div>LOADING</div>
              )}
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
              style={{ backgroundColor: "whitesmoke" }}
            >
              {!loading ? (
                <DatatablePage monies={incomeArray} />
              ) : (
                <div>LOADING</div>
              )}
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
              style={{ backgroundColor: "whitesmoke" }}
            >
              {!loading ? (
                <DatatablePage monies={expenseArray} />
              ) : (
                <div>LOADING</div>
              )}
            </div>
          </div>
        </Container>

        <div className=" mt-auto">
          <Footer />
        </div>
      </font>
    </>
  );
}

export default AllTranscation;
