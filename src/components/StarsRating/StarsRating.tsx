import styles from './StarsRating.module.css';

type Props = { voteAverage: number };

const StarsRating = ({ voteAverage }: Props) => {
    if (!voteAverage) {
        return <span className={styles.noRating}>No rating yet</span>;
    }

    const stars = Math.round(voteAverage / 2);

    return (
        <div className={styles.wrapper} aria-label={`Rating: ${voteAverage.toFixed(1)} out of 10`}>
            <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < stars ? styles.filled : styles.empty}>★</span>
                ))}
            </div>
            <span className={styles.score}>{voteAverage.toFixed(1)}</span>
        </div>
    );
};

export { StarsRating };
