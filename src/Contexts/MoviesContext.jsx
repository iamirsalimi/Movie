import { createContext } from "react";

let MoviesContext = createContext({
  isPending: false,
  error: false,
  movies: [],
  setMovies: () => {},
  loading: true,
  setLoading: () => {}
})

export default MoviesContext