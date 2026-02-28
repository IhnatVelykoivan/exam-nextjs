import type { Metadata } from 'next';
import styles from './page.module.css';
import { getGenres, getMovies, searchMovies } from '@/services/api.service';
import { MoviesList } from '@/components/MoviesList/MoviesList';
import { Pagination } from '@/components/Pagination/Pagination';
import { GenreSidebar } from '@/components/GenreSidebar/GenreSidebar';

export const metadata: Metadata = {
    title: 'MovieDB — Discover Movies',
    description: 'Browse, search and discover movies from TMDB',
};

type Props = {
    searchParams: Promise<{ page?: string; genre?: string; query?: string }>;
};

const MoviesPage = async ({ searchParams }: Props) => {
    const { page = '1', genre, query } = await searchParams;
    const pageNum = Number(page);

    const [moviesData, genres] = await Promise.all([
        query
            ? searchMovies(query, pageNum)
            : getMovies(pageNum, genre),
        getGenres(),
    ]);

    return (
        <div className={styles.container}>
            <GenreSidebar genres={genres} activeGenreId={query ? undefined : genre} />
            <div className={styles.content}>
                {query && (
                    <p className={styles.searchInfo}>
                        Search results for: <strong>&quot;{query}&quot;</strong>
                        {' '}({moviesData.total_results} found)
                    </p>
                )}
                <MoviesList movies={moviesData.results} genres={genres} />
                <Pagination
                    currentPage={pageNum}
                    totalPages={moviesData.total_pages}
                    genre={genre}
                    query={query}
                />
            </div>
        </div>
    );
};

export default MoviesPage;
