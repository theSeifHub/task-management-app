import React, { useState } from 'react';
import { FiSearch, FiX } from "react-icons/fi";
import { useAppDispatch } from '../app/hooks';
import {
  getTasksList,
  searchTasks,
} from '../app/actionsAndThunks';


const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
 const handleSearch = (query: string) => {
  if (query) {
    dispatch(searchTasks(query));
  }
 }
 const handleClearSearch = () => {
  setSearchQuery('');
  dispatch(getTasksList());
 }
  return (
    <form className='search-form'>
      <label htmlFor="search-input" />
      <input
        type="text"
        name="search-input"
        placeholder='Search'
        id="search-input"
        aria-label='Search Input'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        title='Search'
        aria-label='Search'
        onClick={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
      >
        <FiSearch className='btn-icon'/>
      </button>
      <button
        title='Search'
        aria-label='Search'
        disabled={!searchQuery}
        onClick={(e) => {
          e.preventDefault();
          handleClearSearch();
        }}
      >
        <FiX className='btn-icon' />
      </button>
    </form>
  )
}

export default SearchForm;