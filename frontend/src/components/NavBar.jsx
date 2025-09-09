import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/NavBar.css";

function NavBar() {
  const { loadPopularMovies } = useMovieContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={loadPopularMovies}>
          Movie App
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link" onClick={loadPopularMovies}>
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
