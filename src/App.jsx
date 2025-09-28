import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TelaListagem from './TelaListagem'
import CadastroProduto from './CadastroProduto'
import EditarProduto from './EditarProduto'



function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<TelaListagem />} />    
      <Route path="/cadastro" element={<CadastroProduto />} />
      <Route path="/editar/:id" element={<EditarProduto />} />

    </Routes>
    </Router>
  )
}
export default App
