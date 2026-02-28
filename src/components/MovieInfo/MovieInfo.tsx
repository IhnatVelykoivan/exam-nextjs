import styles from './MovieInfo.module.css';
import { IGenre, IMovie } from '@/types/movie.types';

type Props = { movie: IMovie; genres: IGenre[] };

const MovieInfo = ({ movie, genres }: Props) => {
    const movieGenres = genres.filter(g => movie.genre_ids.includes(g.id));

    return (
        <div className={styles.info}>
            <h3 className={styles.title}>{movie.title}</h3>
            {movie.release_date && (
                <p className={styles.year}>{movie.release_date.slice(0, 4)}</p>
            )}
            <p className={styles.overview}>{movie.overview}</p>
            {movieGenres.length > 0 && (
                <div className={styles.genres}>
                    {movieGenres.map(genre => (
                        <span key={genre.id} className={styles.badge}>
                            {genre.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export { MovieInfo };
