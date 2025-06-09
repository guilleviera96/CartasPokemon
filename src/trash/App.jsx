import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router";
import { PokeCardView } from "./components";
import Header from "./layouts/Header/Header";
// function App() {

//   const [pokemon, setPokemon] = useState(null);

//   useEffect(() => {
//     fetch("https://pokeapi.co/api/v2/pokemon/snorlax")
//       .then((res) => res.json())
//       .then((data) => setPokemon(data));
//   }, []);

//   return (<div>{pokemon && <PokeCardGuillermoViera pokemon={pokemon} />}</div>);
// }

export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <Outlet/>
      <PokeCardView/>
    </BrowserRouter>

  );
};

