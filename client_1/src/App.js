import './App.css';
import {Routes, Route} from 'react-router-dom'
import CMS_PUSAT from './views/cms_pusat';
import CMS_TENGAH_APOTEK from "./views/cms_tengah_apotek";
import CMS_TENGAH_IGD from "./views/cms_tengah_igd.js";
import CMS_TENGAH_POLY from "./views/cms_tengah_poly.js";


function App() {
  return (
    <Routes>
        <Route path='/' element={<CMS_PUSAT />}></Route>
        <Route path='/apotek' element={<CMS_TENGAH_APOTEK />}></Route>
        <Route path='/poly' element={<CMS_TENGAH_POLY />}></Route>
        <Route path='/igd' element={<CMS_TENGAH_IGD />}></Route>
    </Routes>
  );
}
export default App;
