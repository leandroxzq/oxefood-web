import { Route, Routes } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import './App.css';
import NavBar from './components/NavBar';
import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';

function App() {

  return (

    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente" element={<FormCliente />} />
        <Route path="/produto" element={<FormProduto />} />
        <Route path="/entregador" element={<FormEntregador />} />
      </Routes>

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2026 - Projeto WEB IV - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
