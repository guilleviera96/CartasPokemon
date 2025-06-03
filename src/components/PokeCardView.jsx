import PokeCardGuillermoViera from "./PokeCard-GuillermoViera";
import { useEffect, useState } from "react";



export default function PokeCardView() {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/snorlax")
            .then((res) => res.json())
            .then((data) => setPokemon(data));
    }, []);
    return (
        <div>{pokemon && <PokeCardGuillermoViera pokemon={pokemon} />}</div>
    );
};