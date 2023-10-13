import React from "react";
import { Card, Col } from "react-bootstrap";

function MoneyCardBlue(props) {
  return (
    <Col>
      <Card className="custom-card">
        <Card.Body>
          <Card.Title>
            <Card.Title>{props.cardText}</Card.Title>
          </Card.Title>
          <Card.Footer className="MoneyText">{props.amountMoney} ฿</Card.Footer>
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
          <Card.Title>{props.cardText}</Card.Title>
          <Card.Footer className="MoneyText">{props.amountMoney} ฿</Card.Footer>
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
            <Card.Title>{props.cardText}</Card.Title>
          </Card.Title>
          <Card.Footer className="MoneyText">{props.amountMoney} ฿</Card.Footer>
          <Card.Text className="CardText">{props.cardText}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export { MoneyCardBlue, MoneyCardRed, MoneyCardGreen };
