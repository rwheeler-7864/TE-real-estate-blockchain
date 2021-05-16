import react, {useState} from "react";
import { Card } from "react-bootstrap";
import React from "react";

interface Props {
  title: string;
  form: React.ReactNode;
  message?: string;
}

export default function FormCard(props: Props) {
  return (
    <div className="FormCardContainer">
      <Card className="FormCard">
        <Card.Header as="h2">{props.title}</Card.Header>
        <Card.Body>
            {props.form}
        </Card.Body>
        {props.message ? <Card.Footer className="text-muted">{props.message}</Card.Footer>: ''}

      </Card>
    </div>
  );
}