import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api.js";
import css from './MovieCast.module.css';
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const MovieCast = () => {
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const castRef = useRef();

  useEffect(() => {
    const getCast = async () => {
      try {
        setError(null);
        setLoading(true);
        const cast = await fetchMovieCast(movieId);
        setCast(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCast();

    const timeoutId = setTimeout(() => {
      if (castRef.current) {
        window.scrollTo({
          top: castRef.current.offsetTop - 130,
          behavior: 'smooth',
        });
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {cast && (
        <ul className={css.castListWrapper} ref={castRef}>
          {cast.map(({ name, character, image }) => (
            <li key={name}>
              <ul className={css.infoList}>
                <li className={css.infoImageWrapper}>
                  <img
                    className={css.infoImage}
                    src={image}
                    alt={name}
                    width="250px"
                    height="350px"
                  />
                </li>
                <li className={css.infoName}>
                  <p>{name}</p>
                </li>
                <li>
                  <p>as {character}</p>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {cast && !cast.length && <p>No information about cast</p>}
    </>
  );
};

export default MovieCast;