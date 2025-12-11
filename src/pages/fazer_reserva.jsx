import { useState } from 'react';
import supabase from "../services/supabase-cliente";

//Tabela dos usuario - users
//Tabela dos espaços a serem reservados - spaces

/*
O sistema precisa conferir se o gmail existe e se existe se a senha está correta, 
ai se der tudo certo você pega o id desse usuario e passa pra tabela reservetion
*/ 


export function Cadastro() {
  const [userList, setUserList] = useState([]);
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [idUser, setIdUser] = useState("");
  const [IdSpace, setIdSpace] = useState("");

  const addUser = async () => {
    const newUserData = {
      user_id: idUser,
      spaces_id: IdSpace,
      start: inicio,
      end: fim
    };

    const { data, error } = await supabase
      .from("reservations")
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

  return (
    <div>
      <h1>Cadastro de Usuários</h1>

      <input
        type="text"
        placeholder="Digite seu gmail aqui"
        value={gmail}
        onChange={(e) => setNome(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Qual horario marca o inicio da sua reserva?"
        value={inicio}
        onChange={(e) => setGmail(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Qual horario marca o fim da sua reserva?"
        value={fim}
        onChange={(e) => setNumero(e.target.value)}
      />

      <br />

      <button onClick={addUser}>
        Salvar valores
      </button>
    </div>
  );
}

export default Cadastro;
