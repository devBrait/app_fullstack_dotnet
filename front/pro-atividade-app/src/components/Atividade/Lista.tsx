import Atividade from "./Atividade";

// Definindo a interface para as props do componente Lista
interface Atividade {
  id: number; 
  titulo: string;
  descricao: string;
  prioridade: string;
}

interface ListaProps {
  atividades: Atividade[];
  deleteAtividade: (id: number) => void;
}


export default function Lista(props: ListaProps) {
  return (
    <div className="mt-3">
    {props.atividades.map((ativ) => (
      <Atividade key={ativ.id} ativ={ativ} deleteAtividade={props.deleteAtividade}/>
    ))}
  </div>
  )
}
