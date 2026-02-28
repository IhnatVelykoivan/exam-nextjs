import styles from './MoviesList.module.css';
import { MoviesListCard } from '@/components/MoviesListCard/MoviesListCard';
import { IGenre, IMovie } from '@/types/movie.types';

type Props = { movies: IMovie[]; genres: IGenre[] };

const MoviesList = ({ movies, genres }: Props) => {
    if (movies.length === 0) {
        return <p className={styles.empty}>No movies found. Try a different search.</p>;
    }

    return (
        <div className={styles.grid}>
            {movies.map(movie => (
                <MoviesListCard key={movie.id} movie={movie} genres={genres} />
            ))}
        </div>
    );
};

export { MoviesList };
