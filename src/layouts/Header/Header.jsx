import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="headerContainer">
      <nav className="navLinks">
        <Link to="/">Inicio</Link>
        <Link to="/booster">Abrir Cartas</Link>
        <Link to="/equipo">Mi equipo</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>
    </header>
  )
}
