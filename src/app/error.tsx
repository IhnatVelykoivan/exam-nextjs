'use client';

import styles from './error.module.css';

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

const Error = ({ error, reset }: Props) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.message}>{error.message}</p>
            <button className={styles.button} onClick={reset}>
                Try again
            </button>
        </div>
    );
};

export default Error;
