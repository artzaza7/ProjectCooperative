import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function MoneyCardBlue(props) {
  return (
    <Col>
      <Card className="custom-card">
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={6}> </Col>
              <Col md={6}>^10%</Col>
            </Row>
          </Card.Title>
          <Card.Footer className="MoneyText">{props.amountMoney}</Card.Footer>
          <Card.Text className="CardText">{props.cardText}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function MoneyCardRed(props) {
  return (
    <Col>
      <Card
        className="custom-card"
        style={{
          background: "linear-gradient(45deg, #DC3545, #DC3545)",
        }}
      >
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={6}> </Col>
              <Col md={6}>^10%</Col>
            </Row>
          </Card.Title>
          <Card.Footer className="MoneyText">{props.amountMoney}</Card.Footer>
          <Card.Text className="CardText">{props.cardText}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

function MoneyCardGreen(props) {
  return (
    <Col>
      <Card
        className="custom-card"
        style={{
          background: "linear-gradient(45deg, #198754, #198754)",
        }}
      >
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={6}> </Col>
              <Col md={6}>^10%</Col>
            </Row>
          </Card.Title>
          <Card.Footer className="MoneyText">{props.amountMoney}</Card.Footer>
          <Card.Text className="CardText">{props.cardText}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export { MoneyCardBlue, MoneyCardRed, MoneyCardGreen };
