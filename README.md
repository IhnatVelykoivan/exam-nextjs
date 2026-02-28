# MovieDB — Контрольна робота

Клієнтський застосунок для [TMDB API](https://www.themoviedb.org/) на Next.js 16 (App Router).

## Запуск

### 1. Встановити залежності

```bash
npm install
```

### 2. Налаштувати змінні середовища

Створити файл `.env.local` у корені проєкту з таким вмістом:

```env
TMDB_TOKEN=Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTEzNTNiMzZiMTBhZDEzZjdiZjEzNzAxYWQxY2JmYiIsIm5iZiI6MTc3MjIwMDAyNS40MzM5OTk4LCJzdWIiOiI2OWExYTA1OWJiYWMwMDQ0OGVlMmUxMWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QwPGvIpa59F2grrvt4nuwiiR-PaeoHrz8v0oHqmpPw0
```

> Токен вже вказано вище — просто скопіюйте рядок цілком у `.env.local`. Це токен для перевірки контрольної роботи.

### 3. Запустити

```bash
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000)

---

## Функціонал

- **Список фільмів** — пагінована сітка з постерами, рейтингом та жанрами
- **Пошук** — пошук за назвою через `next/form` (GET-навігація, без JS)
- **Фільтр за жанром** — бічна панель з усіма жанрами
- **Сторінка фільму** — постер, рейтинг зірками, жанри-посилання, опис
- **Пагінація** — навігація через `<Link>` + `searchParams`
- **Метадані** — `generateMetadata` на сторінці фільму (SEO)

---

## Структура проєкту

```
src/
├── app/
│   ├── layout.tsx               # Кореневий layout (Header + main)
│   ├── page.tsx                 # Головна сторінка (список + пошук + фільтр)
│   ├── loading.tsx              # Стан завантаження
│   ├── error.tsx                # Сторінка помилки
│   └── movies/[id]/
│       └── page.tsx             # Сторінка фільму + generateMetadata
├── components/
│   ├── Header/                  # Шапка з логотипом та пошуком
│   ├── SearchForm/              # Форма пошуку (next/form, GET)
│   ├── GenreSidebar/            # Бічна панель жанрів з активним станом
│   ├── MoviesList/              # Сітка карток фільмів
│   ├── MoviesListCard/          # Картка фільму → /movies/[id]
│   ├── PosterPreview/           # Постер (next/image)
│   ├── MovieInfo/               # Назва, рік, опис, жанри
│   ├── StarsRating/             # Зірки рейтингу (0–5)
│   ├── GenreBadge/              # Жанр-посилання /?genre=ID
│   ├── UserInfo/                # Інформація про користувача
│   └── Pagination/              # Попередня / наступна сторінка
├── services/
│   └── api.service.ts           # getMovies, getGenres, searchMovies, getMovieById
└── types/
    └── movie.types.ts           # IMovie, IGenre, IMoviesResponse
```

---

## Концепції Next.js

| Концепція | Де використовується |
|---|---|
| App Router, `layout.tsx`, `page.tsx` | Весь проєкт |
| Динамічний маршрут `[id]` | `/movies/[id]/page.tsx` |
| `await params` / `await searchParams` | Обидві сторінки (Next.js 15+) |
| `generateMetadata` | Сторінка фільму |
| `next/link` | Картки, жанри, пагінація, хедер |
| `next/image` | Постери фільмів |
| `next/form` з `action="/"` (GET) | Пошук |
| Async Server Components | Всі компоненти з даними |
| CSS Modules | Всі компоненти |
| `cache: 'no-cache'` (SSR) | Список фільмів, пошук |
| `next: { revalidate: 3600 }` (ISR) | Сторінка фільму |
| `loading.tsx` / `error.tsx` | Стани завантаження та помилки |

---

## API

TMDB API v3. Використовувані ендпоінти:

| Дія | URL |
|---|---|
| Список фільмів | `GET /discover/movie?page={n}` |
| Фільтр за жанром | `GET /discover/movie?with_genres={id}&page={n}` |
| Пошук | `GET /search/movie?query={q}&page={n}` |
| Деталі фільму | `GET /movie/{id}` |
| Жанри | `GET /genre/movie/list` |

---

## Тести

```bash
npm run test:run
```

Покрито: `StarsRating`, `Pagination`, `MoviesList`, `GenreSidebar`, `api.service`.
