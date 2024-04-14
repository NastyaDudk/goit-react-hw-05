import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx"
import Navigation from "./components/Navigation/Navigation.jsx";
import MovieCast from "./components/MovieCast/MovieCast.jsx"
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews.jsx")
);
import Loader from "./components/Loader/Loader.jsx";

import css from "./App.module.css";  

const App = () => {
  return (
 
    <>
      <Navigation />
      <div className={css.container}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
             <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      </>
     
  );
};

export default App;