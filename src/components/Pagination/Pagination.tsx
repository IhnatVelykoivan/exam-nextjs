import Link from 'next/link';
import styles from './Pagination.module.css';

type Props = {
    currentPage: number;
    totalPages: number;
    genre?: string;
    query?: string;
};

const Pagination = ({ currentPage, totalPages, genre, query }: Props) => {
    const buildHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        if (genre) params.set('genre', genre);
        if (query) params.set('query', query);
        return `/?${params.toString()}`;
    };

    const clampedTotal = Math.min(totalPages, 500);

    return (
        <div className={styles.pagination} aria-label="Pagination">
            {currentPage > 1 && (
                <Link href={buildHref(currentPage - 1)} className={styles.btn}>
                    ← Prev
                </Link>
            )}

            <span className={styles.info}>
                Page {currentPage} of {clampedTotal}
            </span>

            {currentPage < clampedTotal && (
                <Link href={buildHref(currentPage + 1)} className={styles.btn}>
                    Next →
                </Link>
            )}
        </div>
    );
};

export { Pagination };
