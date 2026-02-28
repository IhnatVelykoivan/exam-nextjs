import Form from 'next/form';
import styles from './SearchForm.module.css';

const SearchForm = () => {
    return (
        <Form action="/" className={styles.form}>
            <input
                type="text"
                name="query"
                placeholder="Search movies..."
                className={styles.input}
                aria-label="Search movies"
            />
            <button type="submit" className={styles.button} aria-label="Search">
                🔍
            </button>
        </Form>
    );
};

export { SearchForm };
