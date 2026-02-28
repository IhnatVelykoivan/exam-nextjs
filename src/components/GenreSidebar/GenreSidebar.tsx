import Link from 'next/link';
import styles from './GenreSidebar.module.css';
import { IGenre } from '@/types/movie.types';

type Props = { genres: IGenre[]; activeGenreId?: string };

const GenreSidebar = ({ genres, activeGenreId }: Props) => {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.heading}>Genres</h2>
            <ul className={styles.list}>
                <li>
                    <Link
                        href="/"
                        className={`${styles.item} ${!activeGenreId ? styles.active : ''}`}
                    >
                        All Movies
                    </Link>
                </li>
                {genres.map(genre => (
                    <li key={genre.id}>
                        <Link
                            href={`/?genre=${genre.id}`}
                            className={`${styles.item} ${activeGenreId === String(genre.id) ? styles.active : ''}`}
                        >
                            {genre.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export { GenreSidebar };
