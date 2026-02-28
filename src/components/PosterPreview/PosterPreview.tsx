import Image from 'next/image';
import styles from './PosterPreview.module.css';
import { TMDB_IMAGE_BASE } from '@/services/api.service';

type Props = { posterPath: string | null; title: string };

const PosterPreview = ({ posterPath, title }: Props) => {
    if (!posterPath) {
        return (
            <div className={styles.placeholder} aria-label="No poster available">
                <span>No Image</span>
            </div>
        );
    }

    return (
        <Image
            src={`${TMDB_IMAGE_BASE}${posterPath}`}
            alt={title}
            width={500}
            height={750}
            className={styles.poster}
        />
    );
};

export { PosterPreview };
