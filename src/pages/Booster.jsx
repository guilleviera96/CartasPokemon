import { useEffect, useState } from "react";
import { PokeCard } from "../components";
import Button from "../components/Button/Button";
import "./Booster.css"

//page booster
export default function Booster() {
    const [puntos, setPuntos] = useState();
    const [pokemones, setPokemones] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [maxSeleccion, setMaxSeleccion] = useState(0);
    const [cargando, setCargando] = useState(false);

    // carga de puntoss desde localStorage
    useEffect(() => {
        const puntosGuardados = localStorage.getItem("puntos");
        if (puntosGuardados !== null && !isNaN(puntosGuardados)) {
            setPuntos(parseInt(puntosGuardados, 10));
        }
    }, []);

    // actualizacion de localstorage
    useEffect(() => {
        if (puntos !== undefined) {
            localStorage.setItem("puntos", puntos);
        }
    }, [puntos]);

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
        const yaSeleccionado = seleccionados.find((p) => p.id === pokemon.id);

        let nuevosSeleccionados;
        if (yaSeleccionado) {
            nuevosSeleccionados = seleccionados.filter((p) => p.id !== pokemon.id);
        } else {
            if (seleccionados.length < maxSeleccion) {
                nuevosSeleccionados = [...seleccionados, pokemon];
            } else {
                alert(`Solo puedes elegir ${maxSeleccion} carta${maxSeleccion > 1 ? "s" : ""}.`);
                return;
            }
        }

        setSeleccionados(nuevosSeleccionados);

        // acumulacion de  cartas en localStorage, no reemplazar
        const cartasGuardadas = JSON.parse(localStorage.getItem("cartasPoseidas") || "[]");

        // combina las cartas guardadas y las nuevas sin repetir
        const cartasCombinadas = [...cartasGuardadas];

        nuevosSeleccionados.forEach((nuevaCarta) => {
            if (!cartasCombinadas.some((c) => c.id === nuevaCarta.id)) {
                cartasCombinadas.push(nuevaCarta);
            }
        });

        localStorage.setItem("cartasPoseidas", JSON.stringify(cartasCombinadas));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 className="puntos"> Puntos: {puntos}</h2>

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

            {cargando && <p>Abriendo sobres</p>}

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {pokemones.map((poke) => (
                    <PokeCard
                        key={poke.id}
                        pokemon={poke}
                        onSelect={elegirCarta}
                        isSelected={seleccionados.some((p) => p.id === poke.id)}
                        showSelectButton={true}
                        disabled={seleccionados.length >= maxSeleccion && !seleccionados.some(p => p.id === poke.id)}
                        ButtonComponent={Button}
                    />
                ))}
            </div>

            {seleccionados.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3 className="elegida">Elegiste:</h3>
                    <ul style={{margin: "0 auto"}}>
                        {seleccionados.map((poke) => (
                            <li className="lista" key={poke.id}>
                                {poke.name.toUpperCase()} #{poke.id}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
