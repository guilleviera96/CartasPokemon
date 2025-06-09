import PokeCard from "./PokeCard-GuillermoViera";
import { useEffect, useState } from "react";
import Button from "./Button/Button";

export default function PokeCardView() {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/snorlax")
            .then((res) => res.json())
            .then((data) => setPokemon(data));
    }, []);
    return (
        <div>
            <div>{pokemon && <PokeCard pokemon={pokemon} />}</div>
        </div>
    );
};