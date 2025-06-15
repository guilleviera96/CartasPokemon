import "./PokeCard-GuillermoViera.css";

function PokeCardGuillermoViera({
  pokemon,
  // función cuando el usuario elige esta carta
  onSelect,                 
  // si ya fue seleccionada (por ejemplo en booster)
  isSelected = false,   
  // para bloquear el botón si ya se eligieron todas    
  disabled = false,    
  // controlamos si mostramos el botón de seleccionar     
  showSelectButton = false, 
  // renderizado opcional para botones personalizados
  extraButtons = null,    
  // componente botón personalizado, por defecto botón nativo  
  ButtonComponent =  "button"
}) {
  return (
    <div className="cardContainer">
      <h2>{pokemon.name.toUpperCase()} #{pokemon.id}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <h3>STATS:</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            <strong>{stat.stat.name.toUpperCase()}</strong>: {stat.base_stat}
          </li>
        ))}
      </ul>

      {/* seleccion para booster */}
      {showSelectButton && (
        <ButtonComponent
          text={isSelected ? "Elegida" : "Elegir"}
          onClick={() => onSelect(pokemon)}
          colorClass={isSelected ? "selected" : "agregarEquipo"}
          disabled={disabled || isSelected}
          style={{ marginTop: "10px" }}
        />
      )}

      {/*  agregar a equipo, fav*/}
      {extraButtons}
    </div>
  );
}

export default PokeCardGuillermoViera;
