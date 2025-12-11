import { useState, useEffect } from 'react';
import supabase from "../services/supabase-cliente";

export function Reserva() {
  const [userList, setUserList] = useState([]);

  // Buscar os espaços da tabela
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("spaces")
      .select("*");

    if (error) {
      console.error(error);
      alert("Erro ao buscar espaços.");
      return;
    }

    setUserList(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Espaços</h1>
      {userList.length === 0 ? (
        <p>Nenhum espaço encontrado.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {userList.map((space) => (
            <div
              key={space.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                width: '200px',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{space.appellation}</h3>
              <p>Capacidade: {space.capacity}</p>
              <button className="card-button">Fazer reserva</button>
              
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reserva;
