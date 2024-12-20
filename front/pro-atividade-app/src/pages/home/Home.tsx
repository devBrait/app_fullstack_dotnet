import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h1>Bem-vindo ao Gerenciador de Atividades</h1>
          <p className="mt-3">
            Explore nosso sistema cadastrando atividades.
          </p>
          <NavLink to="/atividades" className="btn btn-primary mt-3">
            Saiba Mais
          </NavLink>
        </Col>
      </Row>
    </Container>
  )
}
