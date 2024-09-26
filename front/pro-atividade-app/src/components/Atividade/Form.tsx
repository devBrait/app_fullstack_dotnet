import React, { useState } from "react";

// Definição dos tipos para as props
interface Atividade {
  id: number;
  titulo: string;
  prioridade: string;
  descricao: string;
}

interface AtividadeFormProps {
  addAtividade: (atividade: Atividade) => void;
  atividades: Atividade[];
}

export default function AtividadeForm(props: AtividadeFormProps) {
  const [titulo, setTitulo] = useState<string>('');
  const [prioridade, setPrioridade] = useState<string>('0');
  const [descricao, setDescricao] = useState<string>('');

  const handleAddAtividade = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novaAtividade: Atividade = {
      id: Math.max(0, ...props.atividades.map(item => item.id)) + 1, // Garante que o ID é único
      prioridade,
      titulo,
      descricao,
    };

    props.addAtividade(novaAtividade);
    setTitulo(''); // Limpa o campo de título
    setPrioridade('0'); // Reseta a prioridade
    setDescricao(''); // Limpa o campo de descrição
  };

  return (
    <form className="row g-3 mt-2" onSubmit={handleAddAtividade}>
      <div className="col-md-6">
        <label className="form-label">Id</label>
        <input id='id' type="text" className="form-control" readOnly
          value={Math.max(0, ...props.atividades.map(item => item.id)) + 1}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Prioridade</label>
        <select id="prioridade" className="form-select" value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
          <option value="0">Selecionar...</option>
          <option value="1">Baixa</option>
          <option value="2">Normal</option>
          <option value="3">Alta</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label">Título</label>
        <input id="titulo" type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div className="col-md-6">
        <label className="form-label">Descrição</label>
        <input id="descricao" type="text" className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <hr />
      <div className="col-12">
        <button className="btn btn-outline-secondary" type="submit">+ Atividade</button>
      </div>
    </form>
  );
}
