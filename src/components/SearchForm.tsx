import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks'
import {
  searchTasks,
  clearSearchResults,
} from '../app/reducer'


const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
 const handleSearch = (query: string) => {
  dispatch(searchTasks(query));
 }
 const handleClearSearch = () => {
  setSearchQuery('');
  dispatch(clearSearchResults());
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
      {searchQuery && (
        <button
          title='Search'
          aria-label='Search'
          onClick={(e) => {
            e.preventDefault();
            handleClearSearch();
          }}
        >
          Clear
        </button>
      )}
      <button
        title='Search'
        aria-label='Search'
        onClick={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
      >
        Search
      </button>
    </form>
  )
}

export default SearchForm;