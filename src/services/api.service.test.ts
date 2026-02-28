import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { getMovies, getGenres, searchMovies, getMovieById } from './api.service';

describe('api.service', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    const mockOk = (data: unknown) =>
        (fetch as Mock).mockResolvedValue({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: () => Promise.resolve(data),
        });

    const mockError = (status: number, statusText: string) =>
        (fetch as Mock).mockResolvedValue({
            ok: false,
            status,
            statusText,
            json: () => Promise.resolve({}),
        });

    describe('error handling', () => {
        it('throws on 401 Unauthorized', async () => {
            mockError(401, 'Unauthorized');
            await expect(getMovies()).rejects.toThrow('TMDB API error: 401 Unauthorized');
        });

        it('throws on 404 Not Found', async () => {
            mockError(404, 'Not Found');
            await expect(getMovieById(999)).rejects.toThrow('TMDB API error: 404 Not Found');
        });

        it('throws on 500 Internal Server Error', async () => {
            mockError(500, 'Internal Server Error');
            await expect(getGenres()).rejects.toThrow('TMDB API error: 500 Internal Server Error');
        });
    });

    describe('getMovies', () => {
        it('returns movies response on success', async () => {
            const mockData = { page: 1, results: [], total_pages: 5, total_results: 100 };
            mockOk(mockData);
            const result = await getMovies();
            expect(result).toEqual(mockData);
        });

        it('calls correct URL without genre', async () => {
            mockOk({ page: 1, results: [], total_pages: 1, total_results: 0 });
            await getMovies(1);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/discover/movie?page=1'),
                expect.any(Object)
            );
        });

        it('calls correct URL with genre', async () => {
            mockOk({ page: 1, results: [], total_pages: 1, total_results: 0 });
            await getMovies(1, '28');
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('with_genres=28'),
                expect.any(Object)
            );
        });
    });

    describe('getGenres', () => {
        it('returns only the genres array, not the wrapper object', async () => {
            const genres = [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }];
            mockOk({ genres });
            const result = await getGenres();
            expect(result).toEqual(genres);
        });
    });

    describe('searchMovies', () => {
        it('encodes special characters in query', async () => {
            mockOk({ page: 1, results: [], total_pages: 1, total_results: 0 });
            await searchMovies('batman & robin');
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('batman%20%26%20robin'),
                expect.any(Object)
            );
        });

        it('includes page parameter', async () => {
            mockOk({ page: 2, results: [], total_pages: 5, total_results: 50 });
            await searchMovies('batman', 2);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('page=2'),
                expect.any(Object)
            );
        });
    });

    describe('getMovieById', () => {
        it('calls correct URL with movie id', async () => {
            const mockMovie = { id: 123, title: 'Test Movie' };
            mockOk(mockMovie);
            await getMovieById(123);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/movie/123'),
                expect.any(Object)
            );
        });

        it('uses revalidate cache option', async () => {
            mockOk({ id: 1, title: 'Test' });
            await getMovieById(1);
            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ next: { revalidate: 3600 } })
            );
        });
    });
});
