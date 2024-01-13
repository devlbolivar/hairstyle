import { Container, Row, Col } from "react-bootstrap";
import { ComponentPropsBase } from "../types";
import { FC } from "react";

const FormContainer: FC<ComponentPropsBase> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
