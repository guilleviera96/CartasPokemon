import React from 'react'
import "./PokeCard-GuillermoViera.css"
function PokeCardGuillermoViera({ pokemon }) {
    
    return (
        
        <div className="cardContainer">
            <h2>{pokemon.name.toUpperCase()} #{pokemon.id}</h2>
            <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            <h3>STATS:</h3>
            <ul>
                {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                        <strong>{stat.stat.name.toUpperCase()}</strong>: {stat.base_stat}

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokeCardGuillermoViera;
