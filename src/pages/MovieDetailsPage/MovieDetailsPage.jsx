import { useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation, Outlet, NavLink } from "react-router-dom";

import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import {fetchMovieById } from "../../api.js";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {movieId} = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchDetailsMovie() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchMovieById (movieId);
        setDetailsMovie(() => response);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDetailsMovie();
  }, [movieId]);

  return (
    <div className={css.mainWrapper}>
      {detailsMovie && (
        <>
          <Link to={backLinkRef.current} className={css.goBackLink}>
            Go Back
          </Link>
          <div className={css.movieWrapper}>
            <ul>
              <li className={css.imageFilm}>
                <img className={css.movieImg}
              src={`https://image.tmdb.org/t/p/w500/${detailsMovie.backdrop_path}`}
              alt={detailsMovie.title}
              />
                </li>
              </ul>
            <div className={css.movieText}>
              <h2>{`${
                detailsMovie.original_title
              } (${detailsMovie.release_date.slice(0, 4)})`}</h2>
              <p>{`User Score: ${detailsMovie.vote_average}%`}</p>
              <h3>Overview</h3>
              <p>{detailsMovie.overview}</p>
              <h4>Genres</h4>
              <ul className={css.afterGenres}>
                {detailsMovie.genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={css.buttonsWrapper}>
            <h4>Additional infomation</h4>
            <ul className={css.movieUl}>
              <li>
                <NavLink to="cast" className={css.linkItem}>Cast</NavLink>
                 </li>
              <li>
                     <NavLink to="reviews" className={css.linkItem}>Reviews</NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
      <Loader loading={loading} />
      {error && <ErrorMessage />}
    </div>
  );
};

export default MovieDetailsPage;
