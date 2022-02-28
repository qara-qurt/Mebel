import React from 'react';
import search from '../assets/img/search.png';

const Search = ({ placeholder, maxWidth, value, setValue, onSearch }) => {
  return (
    <div className='header__search d-flex align-items-center' style={{ maxWidth: maxWidth }}>
      <img src={search} className='icon' alt='' onClick={onSearch} />
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch(e);
          }
        }}
      />
    </div>
  );
};

export default Search;
