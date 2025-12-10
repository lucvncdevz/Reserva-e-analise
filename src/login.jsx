import { useState } from 'react';
import supabase from "./supabase-cliente";
import './index.css';

export function Login() {
  const [userList, setUserList] = useState([]);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const addUser = async () => {
    const newUserData = {
      name: nome,
      key: senha,
    };

    const { data, error } = await supabase
      .from("users")
      .insert([newUserData]);

    if (error) {
      console.error(error);
    } else {
      setUserList((prev) => [...prev, data]);
      setNome("");
      setSenha("");
    }
  };

  return (
    <div className="login-container">

      <h1 className="login-title">Tela de Login</h1>

      <input
        className="login-input"
        type="text"
        placeholder="Digite seu nome aqui"
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Digite aqui sua senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button className="login-button" onClick={addUser}>
        Salvar valores
      </button>

    </div>
  );
}

export default Login;
