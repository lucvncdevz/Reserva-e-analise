import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Login from "./login.jsx";
import Cadastro from "./cadastro.jsx";
import Home from "./home.jsx";
import Reserva from "./reserva.jsx";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/cadastro">Cadastro</Link>
        <Link className="nav-link" to="/reserva">Reservas</Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="*" element={<h1>Not Found - ERROR: 69</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
