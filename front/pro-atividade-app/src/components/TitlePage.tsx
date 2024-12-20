import { Button } from "react-bootstrap"

interface TitlePageProps {
    titulo: string;
    novaAtividade: () => void; // Tipo de função para o evento
}

export default function TitlePage({titulo, novaAtividade}: TitlePageProps) {
    return(
        <div className="d-flex justify-content-between align-item-end mt-3 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">
            {titulo}
        </h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className='fas fa-plus'></i>
        </Button>
      </div>
    )
}