import React from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import DatatablePage from "../component/Table";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function AllTranscation() {
  return (
    <>
      <Nav />
      <div
        className="ImageBox"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div
        style={{
          marginTop: "1rem",
          display: "flex", // Make the Container a flex container
          justifyContent: "flex-end", // Align its children to the end
        }}
      >
        <Link to={{ pathname: "/incomeform", state: { typeName: "Income" } }}>
          <Button variant="success" style={{ marginRight: "1rem" }}>
            + Income
          </Button>{" "}
        </Link>
        <Link
          to={{
            pathname: "/expenseform",
            state: { typeName: "Expense" },
          }}
        >
          <Button variant="danger" style={{ marginRight: "1rem" }}>
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
            <DatatablePage />
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <DatatablePage />
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <DatatablePage />
          </div>
        </div>
      </Container>

      <div className=" mt-auto">
        <Footer />
      </div>
    </>
  );
}

export default AllTranscation;
