import styles from './loading.module.css';

const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner} aria-label="Loading" />
        </div>
    );
};

export default Loading;
