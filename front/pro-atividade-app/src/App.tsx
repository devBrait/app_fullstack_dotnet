import { FormEvent, useState } from "react";

const initialState = [
  {
    id: 1,
    titulo: 'Primeiro título',
    prioridade: '1',
    descricao: 'Primeira atividade'
  },
];

export default function App() {

  const [atividades, setAtividades] = useState(initialState);

  function addAtividade(e: FormEvent) {

    e.preventDefault()

    const novaAtividade = {
      id: document.getElementById('id').value,
      prioridade: document.getElementById('prioridade').value,
      titulo: document.getElementById('titulo').value,
      descricao: document.getElementById('descricao').value,
    }
    
    setAtividades([...atividades, { ...novaAtividade }]);
  }

  function prioridadeLabel(param: string){
    switch(param){
      case '1':
        return 'Baixa'
      case '2':
         return 'Normal'
      case '3':
        return 'Alta'
      default:
        return 'Não definido'
    }
  }

  function prioridadeIcon(param: string, icon: boolean = false){
    switch(param){
      case '1':
        return icon ? 'smile' : 'success'
      case '2':
         return icon ? 'meh' : 'dark'
      case '3':
        return icon ? 'frown' : 'warning'
      default:
        return 'Não definido'
    }
  }

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Id</label>
          <input id='id' type="text" className="form-control" readOnly
          value={Math.max.apply(Math, atividades.map(item => item.id)) + 1}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select id="prioridade" className="form-select">
            <option defaultValue="0">Selecionar...</option>
            <option value="1">Baixo</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input id="titulo" type="text" className="form-control"/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Descrição</label>
          <input id="descricao" type="text" className="form-control"/>
        </div>
        <hr/>
        <div className="col-12">
          <button className="btn btn-outline-secondary" onClick={addAtividade}>+ Atividade</button>
        </div>
      </form>
      <div className="mt-3">
          {atividades.map(ativ => (
            <div key={ativ.id} className={"card mb-2 shadow-sm border-" + prioridadeIcon(ativ.prioridade)}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">
                  <span className="badge rounded-pill text-bg-secondary me-1">{ativ.id}</span>
                    - {ativ.titulo}</h5>
                  <h6>Prioridade: 
                      <span className={"ms-1 text-"+ prioridadeIcon(ativ.prioridade)}>
                        <i className={"me-1 far fa-" + prioridadeIcon(ativ.prioridade, true)}></i>
                        {prioridadeLabel(ativ.prioridade)}
                      </span>
                    </h6>
                </div>
                <p className="card-text">{ativ.descricao}</p>
                <div className="d-flex justify-content-end border-top pt-2 m-0">
                  <button className="btn btn-sm btn-outline-primary me-2">
                    <i className="fas fa-pen me-2"></i>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="fas fa-trash me-2"></i>
                    Deletar
                  </button>
                </div>
              </div>
          </div>
          ))}
      </div>
    </>
  );
}
