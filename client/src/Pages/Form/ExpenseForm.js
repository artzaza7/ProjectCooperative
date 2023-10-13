import React, { useState } from "react";
import NavCustom from "../../component/Nav";
import Footer from "../../component/Footer";
import { Container, Button, Stack, Dropdown, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Import API
import { createExpenseWithUserId } from "../../service/ExpenseService";

// Import Library
import jwtDecode from "jwt-decode";

function ExpenseForm() {
  // Navigator
  const navigate = useNavigate();

  const expenses = [
    "ค่าอาหาร",
    "ค่าเดินทาง",
    "ค่าที่พัก",
    "หนี้",
    "ความสุข",
    "ค่าของใช้",
  ];

  // Data for create Income or Expense
  const [money, setMoney] = useState(0);
  const [type, setType] = useState(expenses[0]);

  const expenseDropdown = expenses.map((expense, index) => {
    return (
      <Dropdown.Item key={index} onClick={(e) => setType(expense)}>
        {expense}
      </Dropdown.Item>
    );
  });

  // function handleSubmitFunction
  async function handleSubmitFunction(e) {
    // NOT REFESH PAGE
    e.preventDefault();

    // Get token
    const token = localStorage.getItem("token");
    handleShow();
    if (token) {
      var data = {
        money: money,
        money_type: type,
      };
      // console.log("Token ", token);
      const user_id = jwtDecode(token).user_id;
      try {
        const response = await createExpenseWithUserId(user_id, data);
        // Success
        console.log("Create Expense successful : " + response.message);

        // Reset Value
        setMoney(0);
        setType(expenses[0]);
      } catch (error) {
        console.log(error.response.data.message);
        console.log("Create Expense not successful");
      }
    } else {
      // Don't have token
      console.log("Don't have token");
      navigate("/");
    }
  }

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        Expense
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
              type="text"
              className="form-control"
              id="amountMoney"
              name="amountMoney"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              style={{ width: "368px" }}
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
                {expenseDropdown}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Button
                className="btn btn-primary"
                onClick={(e) => handleSubmitFunction(e)}
              >
                Submit
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>เพิ่มข้อมูลรายจ่ายสำเร็จ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  รายจ่าย <br />
                  จำนวนเงิน: {money} <br />
                  ประเภท: {type} <br />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={handleClose}>
                    ตกลง
                  </Button>
                </Modal.Footer>
              </Modal>
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

export default ExpenseForm;
