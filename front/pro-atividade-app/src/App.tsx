import { useEffect, useState } from "react"
import Form from "./components/Atividade/Form"
import Lista from "./components/Atividade/Lista"
import api from './components/api/atividade'
import { Button, Modal } from "react-bootstrap"

// Definição do tipo Atividade
interface Atividade {
  id: number
  titulo: string
  prioridade: string
  descricao: string
}

export default function App() {
  const [atividades, setAtividades] = useState<Atividade[]>([])
  const [atividade, setAtividade] = useState<Atividade | undefined>(undefined)
  const [showAtividadeModal, setShowAtividadeModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal)

  const handleConfirmModal = (id: number) => {
    if(id !== 0 && id !== undefined) {
      const atividade = atividades.find(atividade => atividade.id === id)
      setAtividade(atividade)
    }else{
      setAtividade({ id: 0, titulo: '', prioridade: '0', descricao: '' })
    }
    setShowConfirmModal(!showConfirmModal)
  }

  // Função para adicionar uma nova atividade
  const addAtividade = async (novaAtividade: Atividade) =>  {
    const response = await api.post('atividade', novaAtividade)
    setAtividades([...atividades, response.data])
    handleAtividadeModal()
  }

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade')
    return response.data
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades()
      if(todasAtividades) {
        setAtividades(await todasAtividades)
      }
    }
    getAtividades()
  }, [])

  const atualizarAtividade = async (atividadeAtualizada: Atividade) => {
    try {
      const response = await api.put(`atividade/${atividadeAtualizada.id}`, atividadeAtualizada);
      if (response.status === 200) {
        const atividadeRetornada = response.data
        const atividadesAtualizadas = atividades.map(ativ =>
          ativ.id === atividadeRetornada.id ? atividadeRetornada : ativ
        )
        setAtividades(atividadesAtualizadas)
        setAtividade(undefined)
        handleAtividadeModal()
        setShowAtividadeModal(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  // Função para selecionar uma atividade para edição
  function pegarAtividade(id: number) {
    const atividade = atividades.find(atividade => atividade.id === id)
    setAtividade(atividade)
    setShowAtividadeModal(true)
  }

  const novaAtividade = () => {
    setAtividade({ id: 0, titulo: '', prioridade: '0', descricao: '' })
    handleAtividadeModal()
  }

  // Função para excluir uma atividade
  const deleteAtividade = async (id: number) => {
    handleConfirmModal(0)
    const response = await api.delete(`atividade/${id}`)
    if(response.status === 200) {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
      setAtividades(atividadesFiltradas)
    }
  }

  // Função para cancelar a edição e limpar o estado
  function cancelarEdicao() {
    setAtividade({ id: 0, titulo: '', prioridade: '0', descricao: '' })
    handleAtividadeModal()
  }

  return (
    <>
      <div className="d-flex justify-content-between align-item-end mt-3 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">Atividade {atividade?.id !== 0 ? atividade?.id : '' }</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className='fas fa-plus'></i>
        </Button>
      </div>
      <Lista
        atividades={atividades}
        handleConfirmModal={handleConfirmModal}
        pegarAtividade={pegarAtividade}
      />
      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className="m-0 p-0">Atividade {atividade?.id !== 0 ? atividade?.id : '' }</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form
            addAtividade={addAtividade}
            atualizarAtividade={atualizarAtividade} 
            atividades={atividades}
            ativSelecionada={atividade}
            cancelarEdicao={cancelarEdicao}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={showConfirmModal} onHide={() => handleConfirmModal(0)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className="m-0 p-0">Excluindo Atividade {atividade?.id !== 0 ? atividade?.id : '' }</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Tem certeza que deseja excluir a atividade {atividade?.id}?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
          <button className="btn btn-outline-success me-2" onClick={() => deleteAtividade(atividade?.id || 0)}>
            <i className="fas fa-check me-2"></i>
            Sim
          </button>
          <button className="btn btn-danger me-2" onClick={() => handleConfirmModal(0)}>
          <i className="fas fa-times me-2"></i>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
