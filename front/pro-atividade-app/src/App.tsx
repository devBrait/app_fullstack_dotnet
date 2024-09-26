import { useState } from "react";
import Form from "./components/Atividade/Form";
import Lista from "./components/Atividade/Lista";

interface Atividade {
  id: number;
  titulo: string;
  prioridade: string;
  descricao: string;
}

const initialState: Atividade[] = [
  {
    id: 1,
    titulo: 'Primeiro título',
    prioridade: '1',
    descricao: 'Primeira atividade'
  },
];

export default function App() {
  const [atividades, setAtividades] = useState<Atividade[]>(initialState);

  function addAtividade(novaAtividade: Atividade) {
    setAtividades([...atividades, novaAtividade]);
  }

  function deleteAtividade(id: number) {
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
    setAtividades(atividadesFiltradas);
  }

  return (
    <>
      <Form addAtividade={addAtividade} atividades={atividades} />
      <Lista atividades={atividades} deleteAtividade={deleteAtividade}/>
    </>
  );
}
