import { useEffect, useState } from "react";
import { PokeCard } from "../components";
import Button from "../components/Button/Button";
import "./Home.css";

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [cartasPoseidas, setCartasPoseidas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    const cartasGuardadas = localStorage.getItem("cartasPoseidas");
    if (cartasGuardadas) {
      setCartasPoseidas(JSON.parse(cartasGuardadas));
    }
  }, []);

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

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {cartasPoseidas.length === 0 ? (
          <p>No hay cartas</p>
        ) : (
          cartasMostrar.map((poke) => <PokeCard key={poke.id} pokemon={poke} />)
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
