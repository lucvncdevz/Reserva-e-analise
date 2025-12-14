import { Routes, Route, BrowserRouter } from "react-router-dom";

// layout
import App from "./App";

// páginas públicas
import Home from "../pages/public/Home";
import Cadastro from "../pages/public/reservas/cadastro";
import SobreNos from "../pages/public/Sobre";
import DashBoard from "../pages/admin/DashBoard";

// páginas admin
//import Dashboard from "../pages/admin/DashBoard";
//import Spaces from "../pages/admin/Spaces";

export default function AppRoutes() {
  return (
    <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/sobre" element={<SobreNos/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="*" element={<h1> Not found - error 69 </h1>}/>
    </Routes>
    </BrowserRouter>
  );
}
