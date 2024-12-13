interface AtividadeProps {
  ativ: {
    id: number 
    titulo: string
    descricao: string
    prioridade: string 
  }
  handleConfirmModal: (id: number) => void
  pegarAtividade: (id: number) => void
}

export default function Atividade(props: AtividadeProps) {

  function prioridadeLabel(param: string) {
    switch (param) {
      case 'Baixa':
      case 'Normal':
      case 'Alta':
        return param
      default:
        return 'Não definido'
    }
  }

  function prioridadeIcon(param: string, icon: boolean = false) {
    switch (param) {
      case 'Baixa':
        return icon ? 'smile' : 'success'
      case 'Normal':
        return icon ? 'meh' : 'dark'
      case 'Alta':
        return icon ? 'frown' : 'warning'
      default:
        return 'Não definido'
    }
  }

  return (
    <div className={"card mb-2 shadow-sm border-" + prioridadeIcon(props.ativ.prioridade)}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                  <span className="badge rounded-pill text-bg-secondary me-1">{props.ativ.id}</span>
                  - {props.ativ.titulo}</h5>
                <h6>Prioridade:
                  <span className={"ms-1 text-" + prioridadeIcon(props.ativ.prioridade)}>
                    <i className={"me-1 far fa-" + prioridadeIcon(props.ativ.prioridade, true)}></i>
                    {prioridadeLabel(props.ativ.prioridade)}
                  </span>
                </h6>
              </div>
              <p className="card-text">{props.ativ.descricao}</p>
              <div className="d-flex justify-content-end border-top pt-2 m-0">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => props.pegarAtividade(props.ativ.id)}>
                  <i className="fas fa-pen me-2"></i>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => props.handleConfirmModal(props.ativ.id)}>
                  <i className="fas fa-trash me-2"></i>
                  Deletar
                </button>
              </div>
            </div>
      </div>
  )
}
