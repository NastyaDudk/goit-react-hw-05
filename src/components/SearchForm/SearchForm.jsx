import css from './SearchForm.module.css';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const input = e.target.elements.search.value.trim();

    if (!input) {
      toast.error('Please enter a query.',
        { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       });
      return;
    }

    onSubmit(input);
    e.target.reset();
  };


  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <input
        className={css.searchInput}
        type="text"
        name="search"
        placeholder="Please write your query..."
      />
      <button className={css.searchButton} type="submit" name="button">
        Search
      </button>
      <ToastContainer/>
    </form>
  );
};

export default SearchForm;