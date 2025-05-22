import "./app.css";
import MovieCard from "./components/MovieCard";

export function App() {
  const movienumber = 1;

  return (
    <>
      <MovieCard movie={{ title: "total", release_date: "2024" }} />
    </>
  );
}
export default App;
