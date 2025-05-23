import React, { useEffect } from "react";
import Search from "./components/search";
import { useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  const fetchMovies = async (query) => {
    setIsLoading(true);
    try {
      const endpoint = searchTerm
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(
            query
          )}&include_adult=false`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("failed");
      }
      const data = await response.json();
      console.log(data);
      if (data.response === "False") {
        setErrorMessage(data.error || "failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`error while fetching films ${error}`);
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="capitalize">
            find <span className="text-gradient">movies</span> you'l like
            without the hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="capitalize mt-10">all movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                // <p key={movie.id} className="text-white">
                //   {movie.title}
                // </p>
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
      <footer className="bg-dark-100 p-4">
        <div className="container mx-auto text-light-100 text-center capitalize">
          created by anas as the first training react project i am not
          responsible about film images because it comes from an api
        </div>
      </footer>
    </main>
  );
};

export default App;
