// Тип одного фільму з TMDB
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

// Тип відповіді TMDB з пагінацією
// export interface MovieSearchResponse {
//   page: number;
//   results: Movie[];
//   total_pages: number;
//   total_results: number;
// }
