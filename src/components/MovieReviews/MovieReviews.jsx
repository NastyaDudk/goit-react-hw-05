import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews} from "../../api.js";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const MovieReviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const reviewsRef = useRef();

  useEffect(() => {
  const getReviews = async () => {
    try {
      setError(null);
      setLoading(true);
      const reviews = await fetchMovieReviews(movieId);
      setReviews(reviews);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  getReviews();

  const tID = setTimeout(() => {
    if (reviewsRef.current) {
      window.scrollTo({
        top: reviewsRef.current.offsetTop - 130,
        behavior: 'smooth',
      });
    }
  }, 500);
  
  return () => {
    clearTimeout(tID);
  };
}, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {reviews && (
        <ul ref={reviewsRef}>
          {reviews.map(({ author, content }) => (
            <li key={author}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews && !reviews.length && <p>No reviews has been posted so far</p>}
    </>
  );
};

export default MovieReviews;