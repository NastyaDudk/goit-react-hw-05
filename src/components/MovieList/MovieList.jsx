import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.movieListItem}>
          <Link
            className={css.movieLink}
            to={`/movies/${id}`}>
            <img className={css.moviePoster} src={poster_path} alt={title} />
            <p className={css.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;