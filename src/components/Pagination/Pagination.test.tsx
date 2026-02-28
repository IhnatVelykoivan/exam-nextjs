import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
    describe('Prev button', () => {
        it('is hidden on the first page', () => {
            render(<Pagination currentPage={1} totalPages={10} />);
            expect(screen.queryByText('← Prev')).not.toBeInTheDocument();
        });

        it('is visible when currentPage > 1', () => {
            render(<Pagination currentPage={3} totalPages={10} />);
            expect(screen.getByText('← Prev')).toBeInTheDocument();
        });

        it('links to the previous page', () => {
            render(<Pagination currentPage={5} totalPages={10} />);
            const prev = screen.getByText('← Prev');
            expect(prev).toHaveAttribute('href', '/?page=4');
        });
    });

    describe('Next button', () => {
        it('is hidden on the last page', () => {
            render(<Pagination currentPage={10} totalPages={10} />);
            expect(screen.queryByText('Next →')).not.toBeInTheDocument();
        });

        it('is visible when not on the last page', () => {
            render(<Pagination currentPage={1} totalPages={10} />);
            expect(screen.getByText('Next →')).toBeInTheDocument();
        });

        it('links to the next page', () => {
            render(<Pagination currentPage={2} totalPages={10} />);
            const next = screen.getByText('Next →');
            expect(next).toHaveAttribute('href', '/?page=3');
        });
    });

    describe('Page info', () => {
        it('displays current and total pages', () => {
            render(<Pagination currentPage={3} totalPages={20} />);
            expect(screen.getByText('Page 3 of 20')).toBeInTheDocument();
        });

        it('clamps totalPages to 500', () => {
            render(<Pagination currentPage={1} totalPages={1000} />);
            expect(screen.getByText('Page 1 of 500')).toBeInTheDocument();
        });

        it('does not clamp when totalPages <= 500', () => {
            render(<Pagination currentPage={1} totalPages={300} />);
            expect(screen.getByText('Page 1 of 300')).toBeInTheDocument();
        });
    });

    describe('URL building', () => {
        it('includes genre param in href', () => {
            render(<Pagination currentPage={1} totalPages={10} genre="28" />);
            const next = screen.getByText('Next →');
            expect(next).toHaveAttribute('href', '/?page=2&genre=28');
        });

        it('includes query param in href', () => {
            render(<Pagination currentPage={1} totalPages={10} query="batman" />);
            const next = screen.getByText('Next →');
            expect(next).toHaveAttribute('href', '/?page=2&query=batman');
        });

        it('includes both genre and query in href', () => {
            render(<Pagination currentPage={2} totalPages={10} genre="28" query="batman" />);
            const prev = screen.getByText('← Prev');
            expect(prev).toHaveAttribute('href', '/?page=1&genre=28&query=batman');
        });

        it('omits genre and query when not provided', () => {
            render(<Pagination currentPage={2} totalPages={10} />);
            const prev = screen.getByText('← Prev');
            expect(prev).toHaveAttribute('href', '/?page=1');
        });
    });
});
