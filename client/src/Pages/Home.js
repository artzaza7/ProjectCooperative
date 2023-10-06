import React from "react";
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

function Home() {
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
          <MoneyCardBlue amountMoney={"500 Bath"} cardText={"Total Income"} />
          <MoneyCardRed amountMoney={"500 Bath"} cardText={"Total Expense"} />
          <MoneyCardGreen amountMoney={"500 Bath"} cardText={"Total Summary"} />
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
                  Select Month
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
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
              <PieChart chartName={"Chart1"} />
            </div>
            <Row style={{ gap: "0.3rem" }}>
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
            </Row>
          </Col>

          <Col
            md={5}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div style={{ padding: "20px", width: "70%" }}>
              <PieChart chartName={"Chart2"} />
            </div>
            <Row style={{ gap: "0.5rem" }}>
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
            </Row>{" "}
            <Col md={1} className=""></Col>
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
        <div className="TextHeader">Table</div>
        <Card
          style={{
            width: "80%",
            height: "00%",
            marginBottom: "40px",
          }}
          className="mx-auto text-center"
        >
          <Container fluid style={{ backgroundColor: "#FFC107" }}>
            <Table />
          </Container>
        </Card>
        <Footer />
      </div>
    </>
  );
}

export default Home;
