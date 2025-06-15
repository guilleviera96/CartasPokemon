import { useState, useEffect } from "react";
import { PokeCard } from "../components";
import Button from "../components/Button/Button";
import { usePuntos } from "../context/PuntosContext";
import "./Booster.css";

export default function Booster() {
  const { puntos, setPuntos } = usePuntos();
  const [pokemones, setPokemones] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [maxSeleccion, setMaxSeleccion] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [cartasPoseidas, setCartasPoseidas] = useState([]);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("cartasPoseidas") || "[]");
    setCartasPoseidas(guardadas);
  }, []);

  const abrirSobre = async (tipo) => {
    const costo = tipo === "basico" ? 5 : 8;
    const max = tipo === "basico" ? 1 : 2;

    if (puntos < costo) {
      alert("No tienes suficientes puntos.");
      return;
    }

    setPuntos((prev) => prev - costo);
    setSeleccionados([]);
    setMaxSeleccion(max);
    setCargando(true);

    const ids = new Set();
    while (ids.size < 5) {
      ids.add(Math.floor(Math.random() * 1025) + 1);
    }

    const datos = await Promise.all(
      [...ids].map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
      )
    );

    setPokemones(datos);
    setCargando(false);
  };

  const elegirCarta = (pokemon) => {
    const maxCartas = 50;

    if (
      cartasPoseidas.length >= maxCartas &&
      !cartasPoseidas.some((c) => c.id === pokemon.id)
    ) {
      alert("Solo se puede tener 50 cartas en el mazo.");
      return;
    }

    const yaSeleccionado = seleccionados.find((p) => p.id === pokemon.id);

    let nuevosSeleccionados;
    if (yaSeleccionado) {
      nuevosSeleccionados = seleccionados.filter((p) => p.id !== pokemon.id);
    } else {
      if (seleccionados.length < maxSeleccion) {
        nuevosSeleccionados = [...seleccionados, pokemon];
      } else {
        alert(`Solo podes elegir ${maxSeleccion} carta${maxSeleccion > 1 ? "s" : ""}.`);
        return;
      }
    }

    setSeleccionados(nuevosSeleccionados);

    if (nuevosSeleccionados.length === maxSeleccion) {
      const cartasCombinadas = [...cartasPoseidas];

      nuevosSeleccionados.forEach((nuevaCarta) => {
        if (!cartasCombinadas.some((c) => c.id === nuevaCarta.id)) {
          if (cartasCombinadas.length < maxCartas) {
            cartasCombinadas.push(nuevaCarta);
          }
        }
      });

      localStorage.setItem("cartasPoseidas", JSON.stringify(cartasCombinadas));
      setCartasPoseidas(cartasCombinadas);

      // resetear selección y vaciar cartas mostradas
      setSeleccionados([]);
      setPokemones([]);
      setMaxSeleccion(0);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="puntos">Puntos: {puntos}</h2>

      <h4 className="paginaTexto">
        Cartas: {cartasPoseidas.length} / 50
      </h4>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Button
          text="Abrir sobre Básico (5 pts)"
          onClick={() => abrirSobre("basico")}
          colorClass="base"
        />
        <Button
          text="Abrir sobre Premium (8 pts)"
          onClick={() => abrirSobre("premium")}
          colorClass="premium"
        />
      </div>

      {cargando && <p className="paginaTexto">Abriendo sobres...</p>}

      {maxSeleccion > 0 && (
        <p className="paginaTexto">
          Cartas seleccionadas: {seleccionados.length} / {maxSeleccion}
        </p>
      )}

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {pokemones.map((poke) => (
          <PokeCard
            key={poke.id}
            pokemon={poke}
            onSelect={elegirCarta}
            isSelected={seleccionados.some((p) => p.id === poke.id)}
            showSelectButton={true}
            disabled={
              seleccionados.length >= maxSeleccion &&
              !seleccionados.some((p) => p.id === poke.id)
            }
            ButtonComponent={Button}
          />
        ))}
      </div>
    </div>
  );
}
