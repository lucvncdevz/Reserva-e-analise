import { useState } from 'react';
import supabase from "../../../services/supabase-cliente";
import { MaskInPhone } from '../../../mascara/telefone';

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
      .select();

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

  const tratarDados = () => {
    if (senha.length < 6){
      return "A senha deve conter pelo menos  6 (seis) numeros"
    }

    if (!gmail.includes ("@")){
      return"O gmail deve conter '@'";
    }


  }

  return (
    <div>
      <h1>Cadastro de Usuários</h1>

      <input
        type="text"
        placeholder="Digite seu nome aqui"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Crie uma senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Digite aqui seu gmail"
        value={gmail}
        onChange={(e) => setGmail(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Digite seu número (opcional)"
        value={numero}
        onChange={(e) => setNumero(MaskInPhone(e.target.value))}
      />

      <br />

      <button onClick={addUser}>
        Salvar valores
      </button>
    </div>
  );
}

export default Cadastro;
