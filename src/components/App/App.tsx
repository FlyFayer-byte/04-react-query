import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import type { Movie, MovieSearchResponse } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

import toast, { Toaster } from 'react-hot-toast';
import styles from './App.module.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const toastShownRef = useRef({
    noResults: false,
    error: false,
  });

  const { data, isLoading, isError } = useQuery<MovieSearchResponse>({
    queryKey: ['movies', search, page],
    queryFn: () => fetchMovies({ query: search, page }),
    enabled: search.length > 0,
    retry: 0,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (!search) return;

    if (isError && !toastShownRef.current.error) {
      toast.error('Something went wrong while fetching movies.');
      toastShownRef.current.error = true;
      return;
    }

    if (
      !isLoading &&
      data &&
      data.results.length === 0 &&
      !toastShownRef.current.noResults
    ) {
      toast.error('No movies found for your request.');
      toastShownRef.current.noResults = true;
    }

    if (data && data.results.length > 0) {
      toastShownRef.current = { noResults: false, error: false };
    }
  }, [isError, isLoading, data, search]);

  return (
    <div className={styles.app}>
      <Toaster position="top-center" />

      <SearchBar
        onSubmit={query => {
          setSearch(query);
          setPage(1);

          toastShownRef.current = { noResults: false, error: false };
        }}
      />

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Failed to fetch movies" />}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
}
