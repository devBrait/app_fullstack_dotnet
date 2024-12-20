import { useState } from "react"
import { Table, Button, Container, Form } from "react-bootstrap"

const clientes = [
  { id: 1, nome: "João Silva", email: "joao.silva@email.com", telefone: "(11) 99999-9999" },
  { id: 2, nome: "Raphael Oliveira", email: "raphael.oliveira@email.com", telefone: "(21) 98888-8888" },
  { id: 3, nome: "Danilo Souza", email: "danilo.souza@email.com", telefone: "(31) 97777-7777" },
]

export default function ClienteLista() {
  const [busca, setBusca] = useState("") 
  const [clientesFiltrados, setClientesFiltrados] = useState(clientes) 

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const termo = e.target.value.toLowerCase()
    setBusca(termo)

    const filtrados = clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.email.toLowerCase().includes(termo) ||
        cliente.telefone.toLowerCase().includes(termo)
    )
    setClientesFiltrados(filtrados)
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Lista de Clientes</h1>
      <Form.Control
        type="text"
        placeholder="Buscar por nome, email ou telefone"
        value={busca}
        onChange={handleSearch}
        className="mb-3"
      />
      {clientesFiltrados.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2">
                    Editar
                  </Button>
                  <Button variant="danger" size="sm">
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </Container>
  )
}
