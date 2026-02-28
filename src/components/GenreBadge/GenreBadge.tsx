import Link from 'next/link';
import styles from './GenreBadge.module.css';
import { IGenre } from '@/types/movie.types';

type Props = { genre: IGenre };

const GenreBadge = ({ genre }: Props) => {
    return (
        <Link href={`/?genre=${genre.id}`} className={styles.badge}>
            {genre.name}
        </Link>
    );
};

export { GenreBadge };
