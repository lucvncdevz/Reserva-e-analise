import { useState } from 'react';
import supabase from "./supabase-cliente";
import './index.css';

export function Cadastro() {
  const [userList, setUserList] = useState([]);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [gmail, setGmail] = useState("");
  const [numero, setNumero] = useState("");

  const addUser = async () => {
    const newUserData = {
      name: nome,
      key: senha,
      email: gmail,
      phone: numero || null
    };

    const { data, error } = await supabase
      .from("users")
      .insert([newUserData])
      .select(); // garante retorno do objeto criado

    if (error) {
      console.error(error);
      alert("Erro ao cadastrar. Verifique os dados.");
      return;
    }

    setUserList((prev) => [...prev, data[0]]);
    setNome("");
    setSenha("");
    setGmail("");
    setNumero("");

    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="login-container">

      <h1 className="login-title">Cadastro de Usuarios</h1>

      <input
        className="login-input"
        type="text"
        placeholder="Digite seu nome aqui"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Crie uma senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <input
        className="login-input"
        type="text"
        placeholder="Digite aqui seu gmail"
        value={gmail}
        onChange={(e) => setGmail(e.target.value)}
      />

      <input
        className="login-input"
        type="text"
        placeholder="Digite seu numero (opcional)"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <button className="login-button" onClick={addUser}>
        Salvar valores
      </button>

    </div>
  );
}

export default Cadastro;
