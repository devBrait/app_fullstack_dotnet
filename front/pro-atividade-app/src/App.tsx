import Atividade from "./pages/atividades/Atividade"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Cliente from './pages/clientes/Cliente'
import Home from "./pages/home/Home"
import PageNotFound from "./pages/PageNotFound"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/clientes" element={<Cliente/>} />
          <Route path="/atividades" element={<Atividade/>} />
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}
