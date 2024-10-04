import React, { useState, useEffect } from "react";

// Definição dos tipos para as props
interface Atividade {
  id: number;
  titulo: string;
  prioridade: string;
  descricao: string;
}

interface AtividadeFormProps {
  addAtividade: (atividade: Atividade) => void
  atualizarAtividade: (atividade: Atividade) => void
  atividades: Atividade[]
  ativSelecionada: Atividade | undefined
  cancelarEdicao: () => void
}

export default function AtividadeForm(props: AtividadeFormProps) {
  const [id, setId] = useState<number>(0)
  const [titulo, setTitulo] = useState<string>('')
  const [prioridade, setPrioridade] = useState<string>('0')
  const [descricao, setDescricao] = useState<string>('')
  const [editando, setEditando] = useState<boolean>(false)

  // Atualiza os campos quando uma atividade existente é selecionada para edição
  useEffect(() => {
    if (props.ativSelecionada) {
      setId(props.ativSelecionada.id)
      setTitulo(props.ativSelecionada.titulo)
      setPrioridade(props.ativSelecionada.prioridade)
      setDescricao(props.ativSelecionada.descricao)
      setEditando(true)// Define o estado de edição como verdadeiro
    } else {
      limparCampos()
    }
  }, [props.ativSelecionada]);

  const handleAddAtividade = (e: React.FormEvent) => {
    e.preventDefault()
    const novaAtividade: Atividade = {
      id: Math.max(0, ...props.atividades.map(item => item.id)) + 1, 
      titulo,
      prioridade,
      descricao,
    };

    props.addAtividade(novaAtividade)
    limparCampos()
  }

  const handleUpdateAtividade = (e: React.FormEvent) => {
    e.preventDefault()
    const atividadeAtualizada: Atividade = {
      id,
      titulo,
      prioridade,
      descricao,
    }
    props.atualizarAtividade(atividadeAtualizada)
    limparCampos()
    setEditando(false)
  }

  const limparCampos = () => {
    setId(0)
    setTitulo('')
    setPrioridade('0')
    setDescricao('')
    setEditando(false)
    props.cancelarEdicao()
  }

  return (
    <>
    <form className="row g-3 mt-2" onSubmit={editando ? handleUpdateAtividade : handleAddAtividade}>
      <div className="col-md-6">
        <label className="form-label">Prioridade</label>
        <select
          id="prioridade"
          className="form-select"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="0">Selecionar...</option>
          <option value="1">Baixa</option>
          <option value="2">Normal</option>
          <option value="3">Alta</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label">Título</label>
        <input
          id="titulo"
          type="text"
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className="col-md-12">
        <label className="form-label">Descrição</label>
        <input
          id="descricao"
          type="text"
          className="form-control"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <hr />
      <div className="col-12">
        {editando ? (
          <>
            <button className="btn btn-outline-success me-2" type="submit">
              Salvar
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={limparCampos}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button className="btn btn-outline-secondary" type="submit">
            + Atividade
          </button>
        )}
      </div>
    </form>
    </>
  )
}
