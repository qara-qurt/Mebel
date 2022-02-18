import React from 'react'
import search from '../assets/img/search.png';

const Search = ({placeholder,maxWidth}) => {
  return (
    <div className="header__search d-flex align-items-center" style={{maxWidth:maxWidth}}>
    <img src={search} className='icon' alt="" />
        <input type="text" placeholder={placeholder}/>
    </div>
  )
}

export default Search