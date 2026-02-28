import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StarsRating } from './StarsRating';

describe('StarsRating', () => {
    it('renders "No rating yet" when voteAverage is 0', () => {
        render(<StarsRating voteAverage={0} />);
        expect(screen.getByText('No rating yet')).toBeInTheDocument();
    });

    it('does not render stars when voteAverage is 0', () => {
        render(<StarsRating voteAverage={0} />);
        expect(screen.queryByText('★')).not.toBeInTheDocument();
    });

    it('renders 5 stars total for any non-zero rating', () => {
        render(<StarsRating voteAverage={7} />);
        const stars = screen.getAllByText('★');
        expect(stars).toHaveLength(5);
    });

    it('renders correct score text', () => {
        render(<StarsRating voteAverage={7.4} />);
        expect(screen.getByText('7.4')).toBeInTheDocument();
    });

    it('rounds vote_average/2 to fill stars: 7 → 4 filled, 1 empty', () => {
        const { container } = render(<StarsRating voteAverage={7} />);
        // CSS Modules generates scoped names, use substring match [class*="filled"]
        const filled = container.querySelectorAll('[class*="filled"]');
        const empty = container.querySelectorAll('[class*="empty"]');
        expect(filled).toHaveLength(4); // Math.round(7/2) = 4
        expect(empty).toHaveLength(1);
    });

    it('renders 5 filled stars for voteAverage 10', () => {
        const { container } = render(<StarsRating voteAverage={10} />);
        const filled = container.querySelectorAll('[class*="filled"]');
        const empty = container.querySelectorAll('[class*="empty"]');
        expect(filled).toHaveLength(5);
        expect(empty).toHaveLength(0);
    });

    it('renders 1 filled star for voteAverage 1', () => {
        const { container } = render(<StarsRating voteAverage={1} />);
        const filled = container.querySelectorAll('[class*="filled"]');
        expect(filled).toHaveLength(1); // Math.round(1/2) = 1
    });

    it('has correct aria-label with formatted score', () => {
        render(<StarsRating voteAverage={8.3} />);
        expect(screen.getByLabelText('Rating: 8.3 out of 10')).toBeInTheDocument();
    });
});
