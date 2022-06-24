import React from 'react';
import SearchForm from './SearchForm';

const Header = (): JSX.Element => {
  return (
    <header className='app-title'>
      <h1>
        Tasks Management App
      </h1>
      <SearchForm />
    </header>
  )
}

export default Header;