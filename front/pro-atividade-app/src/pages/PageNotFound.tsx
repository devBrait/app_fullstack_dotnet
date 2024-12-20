
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound(){
  const navigate = useNavigate()

  return (
    <Container fluid className="min-vh-90 d-flex align-items-center">
      <Container className="text-center py-5">
        {/* Número 404 estilizado */}
        <div className="position-relative mb-4">
          <h1 className="display-1 fw-bold text-black-50" style={{ fontSize: '150px' }}>
            404
          </h1>
        </div>    
        <h2 className="display-6 mb-3">Página não encontrada</h2>
        <br></br>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/')}
            className="px-4"
          >
            Voltar para Home
          </Button>
        </div>
      </Container>
    </Container>
  )
}