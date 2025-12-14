import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../../services/supabase-cliente";

export function FazerReserva({spaceId, onVoltar}) {
  const [gmail, setGmail] = useState("");
  const [senha, setSenha] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const handleReserva = async () => {
    
    const erro = tratamentoDeDados();
    if (erro) {
      alert(erro);
      return;
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", gmail)
      .eq("key", senha)
      .single();

    
 //Enviando dados
    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          user_id: user.id,
          spaces_id: spaceId,
          start: inicio,
          end: fim
        }
      ])
      .select();

    if (error) {
      console.error(error);
      alert("Erro ao realizar reserva.");
      return;
    }

    alert("Reserva realizada com sucesso!");
  };

  const tratamentoDeDados = () => {
    if (!gmail || !senha || !inicio || !fim){
      return"Preencha todos os campos!"
    }

    if (!gmail.includes("@")){
      return "O gmail deve conter o '@'!"
    }

    if (new Date(fim) <= new Date(inicio)){
      return"A data final precisa ser depois da data inicial. Escolha uma data posterior."
    }
    
   return null;
  }

  const navigate = useNavigate();

  return (
    <div> 
      
    <div>
      <h2>Fazer Reserva</h2>

      <input
        type="text"
        placeholder="Seu Gmail"
        value={gmail}
        onChange={(e) => setGmail(e.target.value)}
      /><br/>

      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br/>

      <input
        type="datetime-local"
        placeholder="Início da reserva"
        value={inicio}
        onChange={(e) => setInicio(e.target.value)}
      /><br/>

      <input
        type="datetime-local"
        placeholder="Fim da reserva"
        value={fim}
        onChange={(e) => setFim(e.target.value)}
      /><br/>

      <button onClick={handleReserva}>
        Confirmar reserva
      </button>

       <p style={{ marginTop: "10px" }}>
      Não tem uma conta?
      <Link to="/cadastro" style={{ marginLeft: "5px" }}>
        Crie uma aqui
      </Link>
    </p>


    
    </div>
    <button onClick={() => onVoltar()}> 
       voltar
    </button>
    </div>
  );
}

export default FazerReserva;
