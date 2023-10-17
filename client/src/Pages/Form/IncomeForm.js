import React, { useState } from "react";
import NavCustom from "../../component/Nav";
import Footer from "../../component/Footer";
import { Container, Button, Stack, Dropdown, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Import API
import { createIncomeWithUserId } from "../../service/IncomeService";

// Import Library
import jwtDecode from "jwt-decode";

function IncomeForm() {
  // Navigator
  const navigate = useNavigate();

  // const for Dropdown
  const incomes = ["เงินเดือน", "งานพิเศษ", "โบนัส"];

  const incomeDropdown = incomes.map((income, index) => {
    return (
      <Dropdown.Item key={index} onClick={(e) => setType(income)}>
        {income}
      </Dropdown.Item>
    );
  });

  // Data for create Income or Expense
  const [money, setMoney] = useState(0);
  const [type, setType] = useState(incomes[0]);

  // function handleSubmitFunction
  async function handleSubmitFunction(e) {
    // NOT REFESH PAGE
    e.preventDefault();
    handleClose();
    // Get token
    const token = localStorage.getItem("token");

    if (token) {
      var data = {
        money: money,
        money_type: type,
      };
      // console.log("Token ", token);
      const user_id = jwtDecode(token).user_id;
      try {
        const response = await createIncomeWithUserId(user_id, data);
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
      <font>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="TextHeader"
        >
          Income
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
              <label
                htmlFor="amountMoney"
                className="form-label"
                style={{
                  height: "3rem",
                  fontSize: "1.5rem",
                }}
              >
                Amount Money
              </label>
              <input
                type="number"
                className="form-control"
                id="amountMoney"
                name="amountMoney"
                value={money}
                style={{ width: "368px", fontSize: "1.5rem" }}
                onChange={(e) => setMoney(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="type"
                className="form-label"
                style={{
                  height: "3rem",
                  fontSize: "1.5rem",
                }}
              >
                Type
              </label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="warning"
                  id="dropdown-basic"
                  style={{
                    width: "368px",
                    height: "3rem",
                    fontSize: "1.3rem",
                  }}
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
                <Button
                  className="btn btn-primary"
                  onClick={handleShow}
                  style={{
                    width: "150px",
                    height: "3rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Submit
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>เพิ่มข้อมูลรายรับสำเร็จ</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    รายรับ <br />
                    จำนวนเงิน: {money.toLocaleString()} <br />
                    ประเภท: {type} <br />
                    กดปุ่มตกลงเพื่อเพิ่มข้อมูล
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="success"
                      onClick={(e) => handleSubmitFunction(e)}
                    >
                      ตกลง
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              <div className="p-2 ms-auto">
                <Link to="/alltransaction">
                  <Button
                    type="submit"
                    className="btn btn-danger"
                    style={{
                      width: "150px",
                      height: "3rem",
                      fontSize: "1.3rem",
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Stack>
          </form>
        </Container>
      </font>
      <div
        className="mt-auto"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end", // Adjusted to align at the bottom
          position: "fixed",
          width: "100%",
          bottom: "0",
        }}
      >
        <Footer />
      </div>
    </>
  );
}

export default IncomeForm;
