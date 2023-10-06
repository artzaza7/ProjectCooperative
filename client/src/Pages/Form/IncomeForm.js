import React, { useState } from "react";
import NavCustom from "../component/Nav";
import Footer from "../component/Footer";
import { Container, Button, Stack, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import API 
import { createIncomeWithUserId } from "../service/IncomeService";
import { createExpenseWithUserId } from "../service/ExpenseService";

// Import Library
import jwtDecode from 'jwt-decode';

function IncomeForm(props) {
  const { mode } = props;

  // const for Dropdown
  const incomes = ['เงินเดือน', 'งานพิเศษ', 'โบนัส'];
  const expenses = ['ค่าอาหาร', 'ค่าเดินทาง', 'ค่าที่พัก', 'หนี้', 'ความสุข', 'ค่าของใช้'];

  const incomeDropdown = incomes.map((income, index) => {
    return <Dropdown.Item key={index} onClick={(e) => setType(income)}>{income}</Dropdown.Item>;
  })

  const expenseDropdown = expenses.map((expense, index) => {
    return <Dropdown.Item key={index} onClick={(e) => setType(expense)}>{expense}</Dropdown.Item>;
  })

  // Data for create Income or Expense
  const [money, setMoney] = useState(0)
  const [type, setType] = useState((mode === "income") ? incomes[0] : expenses[0])

  // function handleSubmitFunction
  async function handleSubmitFunction(e) {
    // NOT REFESH PAGE
    e.preventDefault();

    // Get token
    const token = localStorage.getItem('token');

    if (token) {
      var data = {
        "money": money,
        "money_type": type
      }
      console.log("Token ", token);
      const user_id = jwtDecode(token).user_id;
      // Mode Income
      if (mode === "income") {
        try {
          const response = await createIncomeWithUserId(user_id, data)
          // Success
          console.log("Create Income successful : " + response.message);
        } catch (error) {
          console.log(error.response.data.message);
          console.log("Create Income not successful");
        }
      }
      // Mode Expense
      else {
        try {
          const response = await createExpenseWithUserId(user_id, data)
          // Success
          console.log("Create Income successful : " + response.message);
        } catch (error) {
          console.log(error.response.data.message);
          console.log("Create Income not successful");
        }
      }

    } else {
      // Don't have token
      console.log("Don't have token");
    }
  }

  return (
    <>
      <NavCustom />
      <div
        className="ImageBox"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="TextHeader"
      >
      </div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="amountMoney" className="form-label">
              Amount Money
            </label>
            <input
              type="number"
              className="form-control"
              id="amountMoney"
              name="amountMoney"
              value={money}
              style={{ width: "368px" }}
              onChange={(e) => setMoney(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <Dropdown>
              <Dropdown.Toggle
                variant="warning"
                id="dropdown-basic"
                style={{ width: "368px" }}
              >
                {type}
              </Dropdown.Toggle>
              {mode === "income" ?
                <Dropdown.Menu style={{ width: "368px" }}>
                  {incomeDropdown}
                </Dropdown.Menu> :
                <Dropdown.Menu style={{ width: "368px" }}>
                  {expenseDropdown}
                </Dropdown.Menu>}

            </Dropdown>
          </div>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              {/* <Link to="/alltransaction"> */}
              <Button type="submit" className="btn btn-primary" onClick={(e) => handleSubmitFunction(e)}>
                Submit
              </Button>{" "}
              {/* </Link> */}
            </div>

            <div className="p-2 ms-auto">
              <Link to="/alltransaction">
                <Button type="submit" className="btn btn-danger">
                  Cancel
                </Button>
              </Link>
            </div>
          </Stack>
        </form>
      </Container>
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
}

export default IncomeForm;
