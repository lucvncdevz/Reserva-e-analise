import {
  Table,TableHead,TableRow,TableCell,TableBody,TextField} from "@mui/material";

import { Link } from "react-router-dom";
import supabase from "../../services/supabase-cliente";
import { useState, useEffect } from "react";

export default function Reservation() {
  const [reservations, setReservations] = useState([]);

  const loadReservationsFromDatabase = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setReservations(data);
  };

  useEffect(() => {
    loadReservationsFromDatabase();
  }, []);

  const updateReservationInState = (
    reservationId,
    fieldName,
    newValue
  ) => {
    setReservations((previousReservations) =>
      previousReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, [fieldName]: newValue }
          : reservation
      )
    );
  };

  const saveReservationFieldToDatabase = async (
    reservationId,
    fieldName,
    newValue
  ) => {
    const { error } = await supabase
      .from("reservations")
      .update({ [fieldName]: newValue })
      .eq("id", reservationId);

    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Início</TableCell>
            <TableCell>Fim</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.id}</TableCell>

              <TableCell>
                <TextField
                  value={reservation.user_email ?? ""}
                  onChange={(e) =>
                    updateReservationInState(
                      reservation.id,
                      "user_email",
                      e.target.value
                    )
                  }
                  onBlur={(e) =>
                    saveReservationFieldToDatabase(
                      reservation.id,
                      "user_email",
                      e.target.value
                    )
                  }
                  variant="standard"
                />
              </TableCell>

              <TableCell>
                <TextField
                  type="datetime-local"
                  value={reservation.start_date ?? ""}
                  onChange={(e) =>
                    updateReservationInState(
                      reservation.id,
                      "start_date",
                      e.target.value
                    )
                  }
                  onBlur={(e) =>
                    saveReservationFieldToDatabase(
                      reservation.id,
                      "start_date",
                      e.target.value
                    )
                  }
                  variant="standard"
                />
              </TableCell>

              <TableCell>
                <TextField
                  type="datetime-local"
                  value={reservation.end_date ?? ""}
                  onChange={(e) =>
                    updateReservationInState(
                      reservation.id,
                      "end_date",
                      e.target.value
                    )
                  }
                  onBlur={(e) =>
                    saveReservationFieldToDatabase(
                      reservation.id,
                      "end_date",
                      e.target.value
                    )
                  }
                  variant="standard"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}
