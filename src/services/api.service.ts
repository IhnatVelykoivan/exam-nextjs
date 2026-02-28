import { IGenre, IMovie, IMoviesResponse } from '@/types/movie.types';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = process.env.TMDB_TOKEN!;

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const HEADERS = {
    Authorization: TOKEN,
    'Content-Type': 'application/json',
};

const checkResponse = async <T>(res: Response): Promise<T> => {
    if (!res.ok) throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    return res.json();
};

export const getMovies = async (page = 1, genreId?: string): Promise<IMoviesResponse> => {
    const genreParam = genreId ? `&with_genres=${genreId}` : '';
    const res = await fetch(
        `${BASE_URL}/discover/movie?page=${page}${genreParam}`,
        { headers: HEADERS, cache: 'no-cache' }
    );
    return checkResponse<IMoviesResponse>(res);
};

export const getGenres = async (): Promise<IGenre[]> => {
    const res = await fetch(`${BASE_URL}/genre/movie/list`, { headers: HEADERS });
    const data = await checkResponse<{ genres: IGenre[] }>(res);
    return data.genres;
};

export const searchMovies = async (query: string, page = 1): Promise<IMoviesResponse> => {
    const res = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
        { headers: HEADERS, cache: 'no-cache' }
    );
    return checkResponse<IMoviesResponse>(res);
};

export const getMovieById = async (movieId: number): Promise<IMovie> => {
    const res = await fetch(
        `${BASE_URL}/movie/${movieId}`,
        { headers: HEADERS, next: { revalidate: 3600 } }
    );
    return checkResponse<IMovie>(res);
};
