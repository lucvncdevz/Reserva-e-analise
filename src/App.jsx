import { useState } from 'react';
import './App.css';
import supabase from "./supabase-cliente";

function App() {
const [ userList, setUserList] = useState ([]);
const [nome, setNome] = useState("");

const addUser = async () => {
  const newUserData = {
    name: nome,
};

const {data,error} = await supabase
.from("users")
.insert([newUserData]);

if (error) {
  console.error(error)
}else{
  setUserList ((prev) => [...prev,data]);
  setNome("");
  }
};

  return (
<div>
<input type = "text" 
placeholder = "Digite seu nome aqui"
onChange = {(e) => setNome(e.target.value)}/>

<button on onClick={addUser}> Salvar valores</button> 

 <h1> Olá mundo</h1>
</div>
  )
}

export default App
