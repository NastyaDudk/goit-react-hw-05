import axios from "axios";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const baseURL = "https://api.themoviedb.org/3/";
const apiAccessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTBmYzA5ZjdmNjQxMWU3NjU1ZDhkYjJjYjkxOWM2NSIsInN1YiI6IjY2MTUwZWVmMTVhNGExMDE3ZGY4Njg2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IGYnqGA3wenA3mSbOZE2ARnER_8RERUdZy0R0MNSHyw";

const instance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: apiAccessToken },
});

export const fetchTrending = async () => {
  const {
    data: { results },
  } = await instance.get("trending/movie/week");
  const trendingList = results.map((movie) => {
    return {
      ...movie,
      poster_path: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `${defaultImg}`,
    };
  });
  return trendingList;
};

export const fetchMovieByKeyword = async (keyword) => {
  const {
    data: { results },
  } = await instance.get(`search/movie?query=${keyword}`);
  const movieList = results.map((movie) => {
    return {
      ...movie,
      poster_path: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `${defaultImg}`,
    };
  });
  return movieList;
};

export const fetchMovieById = async (id) => {
  const { data } = await instance.get(`movie/${id}`);
  const movie = {
    ...data,
    poster_path: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : `${defaultImg}`,
  };
  return movie;
};

export const fetchMovieCast = async (id) => {
  const {
    data: { cast: castList },
  } = await instance.get(`movie/${id}/credits`);
  const cast = castList.map(({ name, character, profile_path }) => {
    return {
      name,
      character,
      image: profile_path
        ? `https://image.tmdb.org/t/p/w200${profile_path}`
        : `${defaultImg}`,
    };
  });
  return cast;
};

export const fetchMovieReviews = async (id) => {
  const {
    data: { results: reviews },
  } = await instance.get(`movie/${id}/reviews`);
  return reviews;
};
