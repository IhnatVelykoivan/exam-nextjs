import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import { Header } from '@/components/Header/Header';

export const metadata: Metadata = {
    title: 'MovieDB',
    description: 'Browse and discover movies',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className={styles.main}>
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
