import { Container, Row, Col } from "react-bootstrap";
import { getYear } from "date-fns";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            © {getYear(new Date())} HairStyle
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
