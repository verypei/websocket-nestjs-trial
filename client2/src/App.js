import './App.css';
import {Routes, Route} from 'react-router-dom'
import PORTAL_POLY from "./views/portal_poly.js"
import PORTAL_APOTEK from "./views/portal_apotek"
import PORTAL_IGD from "./views/portal_igd"

// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3334');//connected to server

function App() {
  return (
    <Routes>
        <Route path='/' element={<PORTAL_APOTEK />}></Route>
        <Route path='/poly' element={<PORTAL_POLY />}></Route>
        <Route path='/igd' element={<PORTAL_IGD />}></Route>
    </Routes>
  );
}

export default App;
