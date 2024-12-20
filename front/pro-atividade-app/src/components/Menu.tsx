import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";


export default function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-dark">
      <Container>
        <Navbar.Brand href="/">Ativy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="clientes">Clientes</Nav.Link>
            <Nav.Link href="atividades">Atividades</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown align="end" title="Brait" id="basic-nav-dropdown">
              <NavDropdown.Item href="clientes">
                Perfil
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Configurações</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Sair
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
