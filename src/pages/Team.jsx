import { useEffect, useState } from "react";
import "./Home.css"
import { PokeCard } from "../components";
import Button from "../components/Button/Button";

export default function Team() {
  const [equipo, setEquipo] = useState([]);
  const [cartasPoseidas, setCartasPoseidas] = useState([]);

  useEffect(() => {
    const equipoGuardado = JSON.parse(localStorage.getItem("equipo") || "[]");
    const cartasGuardadas = JSON.parse(localStorage.getItem("cartasPoseidas") || "[]");

    setEquipo(equipoGuardado);
    setCartasPoseidas(cartasGuardadas);
  }, []);

  const removerDeEquipo = (id) => {
    const actualizado = equipo.filter((pokeId) => pokeId !== id);
    setEquipo(actualizado);
    localStorage.setItem("equipo", JSON.stringify(actualizado));
  };

  const equipoCompleto = cartasPoseidas.filter((poke) => equipo.includes(poke.id));

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="tittle">Mi Equipo Pokemon ({equipoCompleto.length}/6)</h2>

      {equipoCompleto.length === 0 ? (
        <p className="paginaTexto">No tenes pokemones en tu equipo.</p>
      ) : (
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {equipoCompleto.map((poke) => (
            <PokeCard
              key={poke.id}
              pokemon={poke}
              ButtonComponent={Button}
              extraButtons={
                <Button
                  text="Remover del equipo"
                  colorClass="paginacion"
                  onClick={() => removerDeEquipo(poke.id)}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
