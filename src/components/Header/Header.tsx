import Link from 'next/link';
import styles from './Header.module.css';
import { SearchForm } from '@/components/SearchForm/SearchForm';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>▶</span>
                    MovieDB
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                </nav>
                <SearchForm />
            </div>
        </header>
    );
};

export { Header };
