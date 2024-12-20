import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Menu from './components/Menu.tsx';
import 'bootswatch/dist/lumen/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <>
  <Menu/>
  <div className="container">
    <StrictMode>
      <App />
    </StrictMode>
  </div>
  </>
  ,
)
