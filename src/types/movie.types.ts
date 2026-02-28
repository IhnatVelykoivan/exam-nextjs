export interface IGenre {
    id: number;
    name: string;
}

export interface IMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    release_date: string;
    genre_ids: number[];
    genres?: IGenre[];
}

export interface IMoviesResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}
