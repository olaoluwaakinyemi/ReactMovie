import { createContext, useState, useContext, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Load popular movies
  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popular = await getPopularMovies();
      setMovies(popular);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch popular movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Search movies
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  // Favorites management
  const addToFavorites = (movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) =>
    favorites.some((movie) => movie.id === movieId);

  return (
    <MovieContext.Provider
      value={{
        movies,
        favorites,
        loading,
        error,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        handleSearch,
        loadPopularMovies, // ✅ Home button refresh
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
