import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Home.css";

function Home() {
  const { movies, loading, error, handleSearch } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={onSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : movies && movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default Home;
