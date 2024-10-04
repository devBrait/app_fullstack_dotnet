import { useState } from "react";
import Form from "./components/Atividade/Form";
import Lista from "./components/Atividade/Lista";

// Definição do tipo Atividade
interface Atividade {
  id: number;
  titulo: string;
  prioridade: string;
  descricao: string;
}

// Estado inicial com uma atividade de exemplo
const initialState: Atividade[] = [
  {
    id: 1,
    titulo: 'Primeiro título',
    prioridade: '1',
    descricao: 'Primeira atividade'
  },
];

export default function App() {
  const [atividades, setAtividades] = useState<Atividade[]>(initialState)
  const [atividade, setAtividade] = useState<Atividade | undefined>(undefined)

  // Função para adicionar uma nova atividade
  function addAtividade(novaAtividade: Atividade) {
    setAtividades([...atividades, novaAtividade])
  }

  // Função para atualizar uma atividade existente
  function atualizarAtividade(atividadeAtualizada: Atividade) {
    const atividadesAtualizadas = atividades.map(ativ =>
      ativ.id === atividadeAtualizada.id ? atividadeAtualizada : ativ
    );
    setAtividades(atividadesAtualizadas)
    setAtividade(undefined);
  }

  // Função para selecionar uma atividade para edição
  function pegarAtividade(id: number) {
    const atividade = atividades.find(atividade => atividade.id === id)
    setAtividade(atividade)
  }

  // Função para excluir uma atividade
  function deleteAtividade(id: number) {
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
    setAtividades(atividadesFiltradas)
  }

  // Função para cancelar a edição e limpar o estado
  function cancelarEdicao() {
    setAtividade(undefined)
  }

  return (
    <>
      <Form
        addAtividade={addAtividade}
        atualizarAtividade={atualizarAtividade} 
        atividades={atividades}
        ativSelecionada={atividade}
        cancelarEdicao={cancelarEdicao}
      />
      <Lista
        atividades={atividades}
        deleteAtividade={deleteAtividade}
        pegarAtividade={pegarAtividade}
      />
    </>
  );
}
