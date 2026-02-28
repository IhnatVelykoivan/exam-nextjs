import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { getMovieById, TMDB_IMAGE_BASE } from '@/services/api.service';
import { StarsRating } from '@/components/StarsRating/StarsRating';
import { GenreBadge } from '@/components/GenreBadge/GenreBadge';

type Props = { params: Promise<{ id: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { id } = await params;
    const movie = await getMovieById(Number(id));
    return {
        title: `${movie.title} — MovieDB`,
        description: movie.overview,
    };
};

const MovieDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const movie = await getMovieById(Number(id));

    return (
        <div className={styles.page}>
            <Link href="/" className={styles.backLink}>
                ← Back to movies
            </Link>

            <div className={styles.hero}>
                <div className={styles.posterWrapper}>
                    {movie.poster_path ? (
                        <Image
                            src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
                            alt={movie.title}
                            width={500}
                            height={750}
                            className={styles.poster}
                        />
                    ) : (
                        <div className={styles.noPoster}>No Image</div>
                    )}
                </div>

                <div className={styles.details}>
                    <h1 className={styles.title}>{movie.title}</h1>

                    <div className={styles.meta}>
                        {movie.release_date && (
                            <span className={styles.year}>{movie.release_date.slice(0, 4)}</span>
                        )}
                        {movie.vote_count > 0 && (
                            <span className={styles.votes}>
                                {movie.vote_count.toLocaleString()} votes
                            </span>
                        )}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.ratingRow}>
                        <StarsRating voteAverage={movie.vote_average} />
                        {movie.vote_average > 0 && (
                            <span className={styles.scoreLabel}>
                                {movie.vote_average.toFixed(1)}
                                <span className={styles.scoreMax}> / 10</span>
                            </span>
                        )}
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                        <div className={styles.genres}>
                            {movie.genres.map(genre => (
                                <GenreBadge key={genre.id} genre={genre} />
                            ))}
                        </div>
                    )}

                    <div className={styles.divider} />

                    <p className={styles.overview}>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
