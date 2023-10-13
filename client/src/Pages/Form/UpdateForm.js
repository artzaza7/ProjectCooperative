import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavCustom from "../../component/Nav";
import Footer from "../../component/Footer";
import { Container, Button, Stack, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Library
import jwtDecode from "jwt-decode";

// Calling API
import {
  getIncomeByIdAndUserId,
  updateIncomeByIdAndUserId,
} from "../../service/IncomeService";
import {
  getExpenseByIdAndUserId,
  updateExpenseByIdAndUserId,
} from "../../service/ExpenseService";

function UpdateForm() {
  // for Params passing id and type(INCOME, EXPENSE)
  const { id, type } = useParams();

  // Navigator
  const navigate = useNavigate();

  // const for Dropdown
  const incomes = ["เงินเดือน", "งานพิเศษ", "โบนัส"];
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
  const initialDropdownValue = type === "INCOME" ? incomes[0] : expenses[0];
  const [typeDropdown, setTypeDropdown] = useState(initialDropdownValue);

  const incomeDropdown = incomes.map((income, index) => {
    return (
      <Dropdown.Item key={index} onClick={(e) => setTypeDropdown(income)}>
        {income}
      </Dropdown.Item>
    );
  });

  const expenseDropdown = expenses.map((expense, index) => {
    return (
      <Dropdown.Item key={index} onClick={(e) => setTypeDropdown(expense)}>
        {expense}
      </Dropdown.Item>
    );
  });

  // Loading
  const [loading, setLoading] = useState(true);

  async function updateSubmit(e) {
    e.preventDefault();
    handleShow();
    // Update Function
    // Get token
    const token = localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user_id;
      try {
        var data = {
          money: Number(money),
          money_type: typeDropdown,
        };
        // console.log(data)
        if (type === "INCOME") {
          // type === INCOME
          const responseUpdateIncome = await updateIncomeByIdAndUserId(
            user_id,
            id,
            data
          );
          console.log(responseUpdateIncome.message);
          navigate("/home");
        } else {
          // type === EXPENSE
          const responseUpdateExpense = await updateExpenseByIdAndUserId(
            user_id,
            id,
            data
          );
          console.log(responseUpdateExpense.message);
          navigate("/home");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      // Don't have token
      console.log("Don't have token");
      navigate("/");
    }
  }

  async function getDataUpdate() {
    // Get token
    const token = localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user_id;
      try {
        if (type === "INCOME") {
          // type === INCOME
          const responseIncome = await getIncomeByIdAndUserId(user_id, id);
          const money_type = responseIncome.data.money_type;
          const money = responseIncome.data.money;
          setMoney(money);
          setTypeDropdown(money_type);
        } else {
          // type === EXPENSE
          const responseExpense = await getExpenseByIdAndUserId(user_id, id);
          const money_type = responseExpense.data.money_type;
          const money = responseExpense.data.money;
          setMoney(money);
          setTypeDropdown(money_type);
        }
        // finish loading
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
    getDataUpdate();
  }, [loading]);

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
        UpdateForm
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
                {typeDropdown}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "368px" }}>
                {type === "INCOME" ? incomeDropdown : expenseDropdown}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Button className="btn btn-primary" onClick={handleShow}>
                Submit
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>เพิ่มข้อมูลรายรับสำเร็จ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  รายรับ <br />
                  จำนวนเงิน: {money} <br />
                  ประเภท: {type} <br />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={(e) => updateSubmit(e)}>
                    ตกลง
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            <div className="p-2 ms-auto">
              <Link to="/home">
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

export default UpdateForm;
