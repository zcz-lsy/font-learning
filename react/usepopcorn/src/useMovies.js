import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [movies, setMovies] = useState([]);

  const KEY = "7ec3a562";

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErr("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await response.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setErr(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setErr("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },

    [query]
  );
  return { isLoading, err, movies };
}
