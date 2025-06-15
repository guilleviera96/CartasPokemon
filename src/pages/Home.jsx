import { useEffect, useState } from "react";
import { PokeCard } from "../components";
import Button from "../components/Button/Button";
import { usePuntos } from "../context/PuntosContext";
import "./Home.css";

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [cartasPoseidas, setCartasPoseidas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [favoritos, setFavoritos] = useState([]);
  const [equipo, setEquipo] = useState([]);

  const { puntos, setPuntos } = usePuntos();

  useEffect(() => {
    const cartasGuardadas = localStorage.getItem("cartasPoseidas");
    const favoritosGuardados = localStorage.getItem("favoritos");
    const equipoGuardado = localStorage.getItem("equipo");

    if (cartasGuardadas) {
      try {
        const cartasParsed = JSON.parse(cartasGuardadas);
        setCartasPoseidas(Array.isArray(cartasParsed) ? cartasParsed : []);
      } catch {
        setCartasPoseidas([]);
      }
    }

    if (favoritosGuardados) {
      try {
        const favParsed = JSON.parse(favoritosGuardados);
        setFavoritos(Array.isArray(favParsed) ? favParsed : []);
      } catch {
        setFavoritos([]);
      }
    }

    if (equipoGuardado) {
      try {
        const equipoParsed = JSON.parse(equipoGuardado);
        setEquipo(Array.isArray(equipoParsed) ? equipoParsed : []);
      } catch {
        setEquipo([]);
      }
    }
  }, []);

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      const nuevosFavoritos = favoritos.filter((fid) => fid !== id);
      setFavoritos(nuevosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    } else {
      if (favoritos.length >= 10) {
        alert("Solo podes tener 10 pokemones en favoritos.");
        return;
      }
      const nuevosFavoritos = [...favoritos, id];
      setFavoritos(nuevosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    }
  };

  const toggleEquipo = (id) => {
    const yaEsta = equipo.includes(id);

    if (yaEsta) {
      const nuevoEquipo = equipo.filter((eId) => eId !== id);
      setEquipo(nuevoEquipo);
      localStorage.setItem("equipo", JSON.stringify(nuevoEquipo));
    } else {
      if (equipo.length >= 6) {
        alert("Tu equipo ya esta completo.");
        return;
      }
      const nuevoEquipo = [...equipo, id];
      setEquipo(nuevoEquipo);
      localStorage.setItem("equipo", JSON.stringify(nuevoEquipo));
    }
  };

  const eliminarPorPuntos = (id) => {
    if (favoritos.includes(id)) {
      alert("No se pueden eliminar cartas favoritas");
      return;
    }

    const nuevoCartas = cartasPoseidas.filter((c) => c.id !== id);
    setCartasPoseidas(nuevoCartas);
    localStorage.setItem("cartasPoseidas", JSON.stringify(nuevoCartas));

    setPuntos((prev) => prev + 2);
  };

  const totalPaginas = Math.ceil(cartasPoseidas.length / ITEMS_PER_PAGE);
  const cartasMostrar = cartasPoseidas.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

  const irAPagina = (numPagina) => {
    if (numPagina < 1 || numPagina > totalPaginas) return;
    setPaginaActual(numPagina);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="tittle">Mis Cartas Pokemon</h2>

      <h4 className="paginaTexto">Cartas: {cartasPoseidas.length}/50</h4>

      <h3 className="paginaTexto">Puntos: {puntos}</h3>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {cartasPoseidas.length === 0 ? (
          <p className="paginaTexto"> No tenes cartas</p>
        ) : (
          cartasMostrar.map((poke) => (
            <PokeCard
              key={poke.id}
              pokemon={poke}
              ButtonComponent={Button}
              extraButtons={
                <>
                  <Button
                    text={
                      favoritos.includes(poke.id)
                        ? "Eliminar de favoritos"
                        : "Agregar a favoritos"
                    }
                    colorClass="agregarFav"
                    onClick={() => toggleFavorito(poke.id)}
                  />
                  <Button
                    text={
                      equipo.includes(poke.id)
                        ? "Eliminar del equipo"
                        : "Agregar a equipo"
                    }
                    colorClass="agregarEquipo"
                    onClick={() => toggleEquipo(poke.id)}
                  />
                  <Button
                    text="Eliminar por puntos"
                    colorClass="eliminar"
                    onClick={() => eliminarPorPuntos(poke.id)}
                  />
                </>
              }
            />
          ))
        )}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacionContainer">
          <Button
            text="Anterior"
            onClick={() => irAPagina(paginaActual - 1)}
            colorClass="paginacion"
            disabled={paginaActual === 1}
          />
          <span className="paginaTexto">
            Página {paginaActual} de {totalPaginas}
          </span>
          <Button
            text="Siguiente"
            onClick={() => irAPagina(paginaActual + 1)}
            colorClass="paginacion"
            disabled={paginaActual === totalPaginas}
          />
        </div>
      )}
    </div>
  );
}
