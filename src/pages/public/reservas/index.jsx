import { useState, useEffect } from "react";
import supabase from "../../../services/supabase-cliente";
import FazerReserva from "./fazer_reserva";
import "./reserva.css"

export function Reserva() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  //Chamando o banco de dados
  const fetchSpaces = async () => {
    const { data, error } = await supabase
      .from("spaces")
      .select("*");

    if (error) {
      console.error(error);
      alert("Erro ao buscar espaços.");
      return;
    }

    setSpaces(data);
  };

  useEffect(() => {
    fetchSpaces();
  }, []);


  return (

    <div>
      {selectedSpace ? (
        <FazerReserva spaceId={selectedSpace}
          onVoltar={() => setSelectedSpace(null)} />) : (
        <div>
          <h1>Lista de Espaços</h1>


          <div className="card-container">
            {spaces.map((space) => (
              <div className="card" key={space.id}>
                <h3>{space.appellation}</h3>
                <p>Capacidade: {space.capacity}</p>
                <p>ID: {space.id}</p>

                <button className="btn" onClick={() => setSelectedSpace(space.id)}>
                  Fazer reserva
                </button>
              </div>
            ))}

          </div>

        </div>
      )}
    </div>
  )
}

export default Reserva;
