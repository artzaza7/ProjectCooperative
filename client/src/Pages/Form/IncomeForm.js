import React, { useState } from "react";
import NavCustom from "../../component/Nav";
import Footer from "../../component/Footer";
import { Container, Button, Stack, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Import API 
import { createIncomeWithUserId } from "../../service/IncomeService";

// Import Library
import jwtDecode from 'jwt-decode';

function IncomeForm() {
  // Navigator
  const navigate = useNavigate();

  // const for Dropdown
  const incomes = ['เงินเดือน', 'งานพิเศษ', 'โบนัส'];

  const incomeDropdown = incomes.map((income, index) => {
    return <Dropdown.Item key={index} onClick={(e) => setType(income)}>{income}</Dropdown.Item>;
  })

  // Data for create Income or Expense
  const [money, setMoney] = useState(0)
  const [type, setType] = useState(incomes[0])

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
      // console.log("Token ", token);
      const user_id = jwtDecode(token).user_id;
      try {
        const response = await createIncomeWithUserId(user_id, data)
        // Success
        console.log("Create Income successful : " + response.message);
        
        // Reset Value
        setMoney(0);
        setType(incomes[0]);

      } catch (error) {
        console.log(error.response.data.message);
        console.log("Create Income not successful");
      }
    } else {
      // Don't have token
      console.log("Don't have token");
      navigate("/");
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
              <Dropdown.Menu style={{ width: "368px" }}>
                {incomeDropdown}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Button type="submit" className="btn btn-primary" onClick={(e) => handleSubmitFunction(e)}>
                Submit
              </Button>
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
