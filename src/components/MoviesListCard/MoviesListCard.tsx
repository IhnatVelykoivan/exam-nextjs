import Link from 'next/link';
import styles from './MoviesListCard.module.css';
import { PosterPreview } from '@/components/PosterPreview/PosterPreview';
import { MovieInfo } from '@/components/MovieInfo/MovieInfo';
import { StarsRating } from '@/components/StarsRating/StarsRating';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { IGenre, IMovie } from '@/types/movie.types';

type Props = { movie: IMovie; genres: IGenre[] };

const MoviesListCard = ({ movie, genres }: Props) => {
    return (
        <Link href={`/movies/${movie.id}`} className={styles.card}>
            <PosterPreview posterPath={movie.poster_path} title={movie.title} />
            <MovieInfo movie={movie} genres={genres} />
            <div className={styles.footer}>
                <StarsRating voteAverage={movie.vote_average} />
                <UserInfo />
            </div>
        </Link>
    );
};

export { MoviesListCard };
