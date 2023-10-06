import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import the useLocation hook
import NavCustom from "../../component/Nav";
import Footer from "../../component/Footer";
import { Container, Button, Stack, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function IncomeForm() {
  const location = useLocation(); // Use the useLocation hook to access the location object
  const typeName = location.state?.typeName; // Access the typeName prop safely using optional chaining

  const [formData, setFormData] = useState({
    amountMoney: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server or perform other actions
    console.log(formData);
  };

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
        Income
      </div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amountMoney" className="form-label">
              Amount Money
            </label>
            <input
              type="text"
              className="form-control"
              id="amountMoney"
              name="amountMoney"
              value={formData.amountMoney}
              onChange={handleChange}
              style={{ width: "368px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amountMoney" className="form-label">
              Amount Money
            </label>
            <input
              type="text"
              className="form-control"
              id="amountMoney"
              name="amountMoney"
              value={formData.amountMoney}
              onChange={handleChange}
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
                Select Month
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "368px" }}>
                <Dropdown.Item href="#/action-1">Type1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Type2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Type3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Link to="/alltransaction">
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>{" "}
              </Link>
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
