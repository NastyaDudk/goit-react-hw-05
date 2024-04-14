import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {

  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.movieListItem}>
          <Link
            className={css.movieLink}
            to={{
              pathname:`/movies/${id}`,
              state:{from:location.pathname}
            }}>
            <img className={css.moviePoster} src={poster_path} alt={title} />
            <p className={css.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;