import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GenreSidebar } from './GenreSidebar';
import { IGenre } from '@/types/movie.types';

const genres: IGenre[] = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
];

describe('GenreSidebar', () => {
    describe('rendering', () => {
        it('renders the "Genres" heading', () => {
            render(<GenreSidebar genres={genres} />);
            expect(screen.getByText('Genres')).toBeInTheDocument();
        });

        it('renders "All Movies" link', () => {
            render(<GenreSidebar genres={[]} />);
            expect(screen.getByText('All Movies')).toBeInTheDocument();
        });

        it('"All Movies" link points to /', () => {
            render(<GenreSidebar genres={[]} />);
            expect(screen.getByText('All Movies')).toHaveAttribute('href', '/');
        });

        it('renders a link for each genre', () => {
            render(<GenreSidebar genres={genres} />);
            expect(screen.getByText('Action')).toBeInTheDocument();
            expect(screen.getByText('Comedy')).toBeInTheDocument();
            expect(screen.getByText('Drama')).toBeInTheDocument();
        });

        it('renders correct total number of links (genres + "All Movies")', () => {
            render(<GenreSidebar genres={genres} />);
            expect(screen.getAllByRole('link')).toHaveLength(genres.length + 1);
        });

        it('each genre link points to /?genre={id}', () => {
            render(<GenreSidebar genres={genres} />);
            expect(screen.getByText('Action')).toHaveAttribute('href', '/?genre=28');
            expect(screen.getByText('Comedy')).toHaveAttribute('href', '/?genre=35');
        });

        it('renders correctly with empty genres list', () => {
            render(<GenreSidebar genres={[]} />);
            expect(screen.getAllByRole('link')).toHaveLength(1); // only "All Movies"
        });
    });

    describe('active state', () => {
        it('"All Movies" is active when activeGenreId is undefined', () => {
            const { container } = render(<GenreSidebar genres={genres} />);
            const allMoviesLink = screen.getByText('All Movies');
            expect(allMoviesLink.className).toMatch(/active/);

            // genre links must NOT be active
            const activeLinks = container.querySelectorAll('[class*="active"]');
            expect(activeLinks).toHaveLength(1);
        });

        it('"All Movies" is active when activeGenreId is explicitly undefined', () => {
            const { container } = render(
                <GenreSidebar genres={genres} activeGenreId={undefined} />
            );
            const allMoviesLink = screen.getByText('All Movies');
            expect(allMoviesLink.className).toMatch(/active/);
            expect(container.querySelectorAll('[class*="active"]')).toHaveLength(1);
        });

        it('matching genre link is active when activeGenreId is set', () => {
            const { container } = render(
                <GenreSidebar genres={genres} activeGenreId="28" />
            );
            const actionLink = screen.getByText('Action');
            expect(actionLink.className).toMatch(/active/);

            // only one link should be active
            expect(container.querySelectorAll('[class*="active"]')).toHaveLength(1);
        });

        it('"All Movies" is NOT active when a genre is selected', () => {
            render(<GenreSidebar genres={genres} activeGenreId="28" />);
            const allMoviesLink = screen.getByText('All Movies');
            expect(allMoviesLink.className).not.toMatch(/active/);
        });

        it('non-matching genre links are NOT active', () => {
            render(<GenreSidebar genres={genres} activeGenreId="28" />);
            const comedyLink = screen.getByText('Comedy');
            const dramaLink = screen.getByText('Drama');
            expect(comedyLink.className).not.toMatch(/active/);
            expect(dramaLink.className).not.toMatch(/active/);
        });
    });
});
