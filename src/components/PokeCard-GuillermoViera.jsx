import "./PokeCard-GuillermoViera.css";

function PokeCardGuillermoViera({
  pokemon,
  onSelect,                 // función cuando el usuario elige esta carta
  isSelected = false,       // si ya fue seleccionada (por ejemplo en booster)
  disabled = false,         // para bloquear el botón si ya se eligieron todas
  showSelectButton = false, // controlamos si mostramos el botón de seleccionar
  extraButtons = null,      // renderizado opcional para botones personalizados
  ButtonComponent = 'button' // Componente botón personalizado, por defecto botón nativo
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

      {/* Botón de selección para Booster */}
      {showSelectButton && (
        <ButtonComponent
          text={isSelected ? "Elegida" : "Elegir"}
          onClick={() => onSelect(pokemon)}
          colorClass={isSelected ? "selected" : "paginacion"}
          disabled={disabled || isSelected}
          style={{ marginTop: "10px" }}
        />
      )}

      {/* botones para agregar a equipo, fav*/}
      {extraButtons}
    </div>
  );
}

export default PokeCardGuillermoViera;
