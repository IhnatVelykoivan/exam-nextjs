import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoviesList } from './MoviesList';
import { IMovie, IGenre } from '@/types/movie.types';

const genres: IGenre[] = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
];

const makeMovie = (overrides: Partial<IMovie> = {}): IMovie => ({
    id: 1,
    title: 'Test Movie',
    overview: 'A test movie overview.',
    poster_path: null,
    vote_average: 7.5,
    vote_count: 1000,
    release_date: '2023-06-15',
    genre_ids: [],
    ...overrides,
});

describe('MoviesList', () => {
    it('renders empty state message when movies array is empty', () => {
        render(<MoviesList movies={[]} genres={[]} />);
        expect(screen.getByText('No movies found. Try a different search.')).toBeInTheDocument();
    });

    it('does not render cards when movies array is empty', () => {
        render(<MoviesList movies={[]} genres={[]} />);
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('renders a card for each movie', () => {
        const movies = [
            makeMovie({ id: 1, title: 'Movie One' }),
            makeMovie({ id: 2, title: 'Movie Two' }),
            makeMovie({ id: 3, title: 'Movie Three' }),
        ];
        render(<MoviesList movies={movies} genres={genres} />);
        expect(screen.getByText('Movie One')).toBeInTheDocument();
        expect(screen.getByText('Movie Two')).toBeInTheDocument();
        expect(screen.getByText('Movie Three')).toBeInTheDocument();
    });

    it('each card links to the correct movie detail page', () => {
        const movies = [makeMovie({ id: 42, title: 'Linked Movie' })];
        render(<MoviesList movies={movies} genres={genres} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/movies/42');
    });

    it('renders genre badges for movie genres', () => {
        const movies = [makeMovie({ id: 1, title: 'Action Film', genre_ids: [28] })];
        render(<MoviesList movies={movies} genres={genres} />);
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders poster image when poster_path is provided', () => {
        const movies = [makeMovie({ id: 1, title: 'With Poster', poster_path: '/abc.jpg' })];
        render(<MoviesList movies={movies} genres={genres} />);
        const img = screen.getByAltText('With Poster');
        expect(img).toBeInTheDocument();
        expect(img.getAttribute('src')).toContain('/abc.jpg');
    });

    it('renders placeholder when poster_path is null', () => {
        const movies = [makeMovie({ id: 1, title: 'No Poster', poster_path: null })];
        render(<MoviesList movies={movies} genres={genres} />);
        expect(screen.getByLabelText('No poster available')).toBeInTheDocument();
    });
});
