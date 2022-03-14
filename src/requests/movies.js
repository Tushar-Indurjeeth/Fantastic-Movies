const fetchMovieDetails = async (id) =>
  await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    )
  ).json();

const fetchInfiniteMovies = async ({ pageParam = 1 }) =>
  await (
    await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${pageParam}`
    )
  ).json();

export { fetchMovieDetails, fetchInfiniteMovies };
